# discordjs-handler

Module qui permet d'exécuter des événements et des commandes pour discord.js en handler.

## Liens
- [NPM](https://www.npmjs.com/package/@natchi/discordjs-handler)
- [Github](https://github.com/Natchi59/discordjs-handler)
  - [Installation](https://github.com/Natchi59/discordjs-handler#installation)
  - [Configuration](https://github.com/Natchi59/discordjs-handler#configuration)

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
<br>**Exemple d'arborescence**
```
├───commands
│   ├───ping.js
│   └───Admin
│       └───prefix.js
├───events
│   ├───ready.js
│   └───message
│       └───message.js
│       └───messageUpdate.js
└───index.js
```
Pour les événements il faudra utiliser un `module.exports` dans chaque fichier d'événements, avec dans l'object la clé `name` et `run` (qui est une fonction de lancement) seront obligatoires.
<br>**Exemple** (fichier ready.js)
```js
module.exports = {
  name: "ready",
  run: (client) => {
    console.log(`${client.user.tag} est connecté !`);
  },
};
```
Pour les commandes il faudra utiliser aussi un `module.exports` dans chaque fichier de commandes, avec dans l'object la clé `name` et `run` (qui est une fonction de lancement) seront aussi obligatoires.
<br>**Exemple** (fichier prefix.js)
```js
module.exports = {
  name: "prefix",
  category: "Admin", // Facultatif
  description: "Permet de changer le prefix", // Facultatif
  adminPermission: true, // Falcultatif
  run: (client, message, args) => {
    // ...
  },
};
```