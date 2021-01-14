import { Client } from 'discord.js';

interface ModuleCtx {
  bot: Client;
}

export type Module = (ctx: ModuleCtx) => void;
