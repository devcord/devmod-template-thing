import { Command, Module } from '../types';

export const Ping: Module = ({ registerCommand }) => {
  const pingCommand: Command = {
    name: 'ping',
    description: 'Ping the bot',
  };

  registerCommand(pingCommand, ({ message }) => {
    message.channel.send('Pong');
  });
};
