import { Client as DiscordClient } from 'discord.js';
import './env';
import * as modules from './modules';

const bot = new DiscordClient();

Object.entries(modules).forEach(([mod, register]) => {
  register({ bot });
  console.log(`Registered module: ${mod}`);
});

bot.login(process.env.BOT_TOKEN)
  .then(() => console.log('Bot logged in successfully'))
  .catch((e) => console.log('Bot login failed: ', e));
