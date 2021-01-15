import { Client, Guild } from 'discord.js';

const getUserFromMention = (client: Client, mention: string) => {
  if (!mention.startsWith('<@') || !mention.endsWith('>')) {
    return undefined;
  }

  const id = mention.slice(mention.startsWith('<@!') ? 2 : 3, -1);
  return client.users.cache.get(id);
};

const getRoleFromMention = (guild: Guild, mention: string) => {
  if (!mention.startsWith('<@&') || !mention.endsWith('>')) {
    return undefined;
  }

  const id = mention.slice(3, -1);
  return guild.roles.cache.get(id);
};

const getChannelFromMention = (guild: Guild, mention: string) => {
  if (!mention.startsWith('<#') || !mention.endsWith('>')) {
    return undefined;
  }

  const id = mention.slice(2, 1);
  return guild.channels.cache.get(id);
};
