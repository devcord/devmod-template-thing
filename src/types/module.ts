import { Client } from 'discord.js';
import { Connection } from 'typeorm';
import { CommandExecutor, Command } from './command';

export interface ModuleCtx {
  client: Client;
  db: Connection;
  registerCommand: (command: Command, fn: CommandExecutor) => void;
}

export type Module = (ctx: ModuleCtx) => void;
