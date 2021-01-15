import { Message } from 'discord.js';
import { CommandOptionType, Module } from '../types';
import { Tag as TagEntity } from '../entities';

export const Tag: Module = ({ registerCommand, db }) => {
  const tagRepository = db.getRepository(TagEntity);

  const handleShowTag = async (
    message: Message,
    name: string,
    userMention: string | undefined,
  ) => {
    const tag = await tagRepository.findOne({ name });
    if (tag !== undefined) {
      message.channel.send(`${userMention} ${tag.body}`);
    } else {
      message.channel.send(`Tag \`${name}\` does not exist.`);
    }
  };

  const handleListTags = async (message: Message) => {
    const tags = await tagRepository.find();

    if (tags.length === 0) {
      message.channel.send('There are currently no tags!');
    } else {
      message.channel.send(tags.map((tag) => `\`${tag.name}\``).join('\n'));
    }
  };

  const parseTagInfo = (tag: string) => {
    const [name, ...body] = tag.split(' ');
    return { name, body: body.join(' ') };
  };

  const handleCreateTag = async (message: Message, tag: string) => {
    const { name, body } = parseTagInfo(tag);

    const alreadyExists = (await tagRepository.findOne({ name })) !== undefined;
    if (alreadyExists) {
      message.channel.send(`Tag \`${name}\` already exists.`);
      return;
    }

    await tagRepository.insert({ name, body });
    message.channel.send(`Tag \`${name}\` created!`);
  };

  const handleEditTag = async (message: Message, tagInfo: string) => {
    const { name, body } = parseTagInfo(tagInfo);

    const tag = await tagRepository.findOne({ name });
    if (tag === undefined) {
      message.channel.send(`Tag \`${name}\` does not exist.`);
      return;
    }

    await tagRepository.save({ ...tag, body });
    message.channel.send(`Tag \`${name}\` updated!`);
  };

  const handleDeleteTag = async (message: Message, name: string) => {
    await tagRepository.delete({ name });
    message.channel.send(`Tag \`${name}\` deleted!`);
  };

  registerCommand({
    name: 'tag',
    description: 'Tags are shortened frequently used messages.',
    options: [{
      type: CommandOptionType.SUB_COMMAND_GROUP,
      name: 'tagName',
      required: true,
      description: 'The name of the tag',
      options: [{
        type: CommandOptionType.SUB_COMMAND,
        name: 'user',
        description: 'User to tag in the response',
      }],
    }, {
      type: CommandOptionType.STRING,
      name: 'list',
      required: true,
      description: 'List existing tags',
    }, {
      type: CommandOptionType.SUB_COMMAND_GROUP,
      name: 'add',
      required: true,
      description: 'To create a new tag',
      options: [{
        type: CommandOptionType.SUB_COMMAND,
        name: 'tagInfo',
        required: true,
        description: '<newTagName> <tagBody>',
      }],
    }, {
      type: CommandOptionType.SUB_COMMAND_GROUP,
      name: 'edit',
      required: true,
      description: 'To edit an existing tag',
      options: [{
        type: CommandOptionType.SUB_COMMAND,
        name: 'tagInfo',
        required: true,
        description: '<existingTagName> <tagBody>',
      }],
    }, {
      type: CommandOptionType.SUB_COMMAND_GROUP,
      name: 'delete',
      required: true,
      description: 'To delete an existing tag',
      options: [{
        type: CommandOptionType.SUB_COMMAND,
        name: 'tagName',
        required: true,
        description: 'Tag to delete',
      }],
    }],
  }, async ({ args, message }) => {
    const { subCommandGroup, subCommand } = args;

    switch (subCommandGroup) {
      case 'list':
        await handleListTags(message);
        break;
      case 'add':
        await handleCreateTag(message, subCommand);
        break;
      case 'edit':
        await handleEditTag(message, subCommand);
        break;
      case 'delete':
        await handleDeleteTag(message, subCommand);
        break;
      default:
        await handleShowTag(message, subCommandGroup, subCommand);
    }
  });
};
