import { Client } from 'discord.js';
import { Connection } from 'typeorm';
import { CommandExecutor, Command } from './command';
import { createScheduler } from '../services';

export interface ModuleCtx {
  client: Client;
  db: Connection;
  scheduleTask: ReturnType<typeof createScheduler>;
  registerCommand: (command: Command, fn: CommandExecutor) => void;
}

export type Module = (ctx: ModuleCtx) => void;
