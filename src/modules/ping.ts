import { Module } from '../module';

export const Ping: Module = ({ bot }) => {
  bot.on('message', (msg) => {
    if (msg.author.bot) {
      return;
    }
    msg.channel.send('pong');
  });
};
