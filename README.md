# discordjs-handler

Module qui permet d'exécuter des événements et des commandes pour discord.js en handler.

## Installation
Nodejs >v14.0.0 requis.  
<br/>Via npm:
```cmd
npm install @natchi/discordjs-handler
```
Via Yarn:
```cmd
yarn add @natchi/discordjs-handler
```

## Configuration
Vous aurez besoin d'installer un total de 3 collections dans le client dans les extensions `events`, `commands`, et `alises`.  
<br/>**Exemple**
```js
const { Client, Collection } = require("discord.js");

const client = new Client();

// 1er moyen
client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();

// 2ème moyen
["events", "commands", "alises"].forEach((e) => client[e] = new Collection());
```
Une fois les collections configurés, vous pouvez exécuter les handlers proposés avec le module.  
<br/>**Exemple**  
```js
const { handlerEvents, handlerCommands } = require("@natchi/discordjs-handler");

(async () => {
  await handlerEvents(client, "events");
  await handlerCommands(client, "commands");
})();
```
<br>Exemple d'arborescence:
```
├───commands
│   └───Admin
│       └───prefix.js
├───events
│   ├───ready.js
│   └───message
│       └───message.js
│       └───messageUpdate.js
└───index.js
```