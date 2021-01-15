import { Client, Message } from 'discord.js';
import { Connection } from 'typeorm';

export enum CommandOptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
}

export interface CommandOption {
  type: CommandOptionType;
  name: string;
  description: string;
  default?: boolean;
  required?: boolean;
  choices?: (string | number)[];
  options?: CommandOption[];
}

export interface Command {
  name: string;
  description: string;
  options?: CommandOption[];
}

// TODO: type properly once interaction api is available
export interface CommandExecutionArgs {
  args: {
    subCommandGroup: string | undefined;
    subCommand: string | undefined;
  };
  message: Message;
}

export interface CommandCtx {
  client: Client,
  db: Connection,
}

export type CommandExecutor = (cmd: CommandExecutionArgs) => void;
