# Modules
Modules are registered at bot launch. They take all services as arguments and typically register
event handlers for interactions, messages, tasks and so on.

All exported functions must be of type `Module`.

Example:
```typescript
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
```
