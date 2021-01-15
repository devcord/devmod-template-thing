import { CommandExecutor, CommandCtx, Command } from '../types';

const prefix = process.env.COMMAND_PREFIX;

export const createCommandRegisterer = (ctx: CommandCtx) => (
  command: Command,
  fn: CommandExecutor,
) => {
  // TODO: wait for Discord.js to implement slash commands,
  //       then implement them here instead of using the message event handler

  ctx.client.on('message', (message) => {
    if (!message.content.startsWith(prefix)) {
      return;
    }

    const msgParts = message.content.slice(prefix.length).split(' ');
    if (msgParts.shift() !== command.name) {
      return;
    }

    fn({
      message,
      args: {
        subCommandGroup: msgParts.shift(),
        subCommand: msgParts.join(' '),
      },
    });
  });
};
