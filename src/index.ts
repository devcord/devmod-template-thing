import { Client as DiscordClient } from 'discord.js';
import './env';
import 'reflect-metadata';
import * as modules from './modules';
import { createCommandRegisterer, establishDbConnection } from './services';

const init = async () => {
  const db = await establishDbConnection();
  const client = new DiscordClient();

  Object.entries(modules).forEach(([mod, register]) => {
    const ctx = { client, db };
    const registerCommand = createCommandRegisterer(ctx);

    register({ client, db, registerCommand });
    console.log(`Registered module: ${mod}`);
  });

  await client.login(process.env.BOT_TOKEN);
  console.log('Bot logged in successfully');
};

init()
  .then(() => console.log('Bot initialised'))
  .catch((e) => console.error('Bot initialisation failed: ', e));
