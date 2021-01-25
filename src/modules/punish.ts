import { CommandOptionType, Module } from '../types';

export const Punish: Module = ({ registerCommand, scheduleTask }) => {
  const punishments = {
    spam: (user: string) => {
      scheduleTask('unmute', '5s', user);
    },
  };

  registerCommand({
    name: 'punish',
    description: 'Hand out a punishment',
    options: [{
      type: CommandOptionType.SUB_COMMAND_GROUP,
      name: 'punishment',
      required: true,
      description: 'The punishment to hand out',
      options: [{
        type: CommandOptionType.USER,
        name: 'user',
        description: 'The user to punish',
      }],
    }],
  }, ({ args }) => {
    const { subCommandGroup: punishment, subCommand: user } = args;
    if (punishments.hasOwnProperty(punishment)) {
      punishments[punishment as keyof typeof punishments](user);
    }
  });
};
