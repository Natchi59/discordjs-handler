# discordjs-handler

Module qui permet d'exécuter des événements ou des commandes ou des interactions pour discord.js en handler.

## Liens

- [NPM](https://www.npmjs.com/package/@natchi/discordjs-handler)
- [Github](https://github.com/Natchi59/discordjs-handler)
  - [Installation](https://github.com/Natchi59/discordjs-handler#installation)
  - [Configuration](https://github.com/Natchi59/discordjs-handler#configuration)

## Installation

Nodejs >v16.6.0 requis.  
<br/>Via npm:

```cmd
npm install @natchi/discordjs-handler
```

Via Yarn:

```cmd
yarn add @natchi/discordjs-handler
```

## Configuration

Vous avez juste à importer la fonction `handler` dans votre projet et l'utilisé qu'une seule fois dans un de vos fichiers.  
Celui ci va crée automatiquement des Collections pour les différentes utilités: `commands`, `events`, `slashCommands`, `buttons`, et `selectMenus`.  
Vous pourrez retrouvez ces collections depuis `client.handler.$`.  
Bien sûr les choix des handlers à éxécuter est optionnel, vous n'êtes pas obliger de préciser tous les chemins, cela est en fonction de votre utilisation.  
<br />**Exemples**  
Javascript

```js
const { handler } = require("@natchi/discordjs-handler");

(async () => {
  await handler(
    client,
    {
      events: "./events",
      commands: "./commands",
      slashCommands: "./interactions/slashcommands",
      buttons: "./interactions/buttons",
      selectMenus: "./interactions/selectmenus",
    },
    {
      lang: "js",
    }
  );
})();
```

Typescript

```ts
import { handler } from "@natchi/discordjs-handler";

(async () => {
  await handler(
    client,
    {
      events: "./events",
      commands: "./commands",
      slashCommands: "./interactions/slashcommands",
      buttons: "./interactions/buttons",
      selectMenus: "./interactions/selectmenus",
    },
    {
      lang: "ts",
    }
  );
})();
```

Pour les fichiers d'événements ou de commandes, ou d'intéractions voici le schéma à suivre selon le langage.  
Pout le langage Typescript, l'export des événements doit se faire obligatoirement par une constante en respectant le nom de celles ci en fonction de ce que vous voulez exporter.  
- Evénements: `event`
- Commandes: `command`
- SlashCommands: `slashCommand`
- Buttons: `button`
- SelectMenus: `button`

<br />**Exemple**  
Javascript

```js
// Fichier message.js
module.exports = {
  name: "message",
  run: (client, message) => {
    // ...
  },
};

// Fichier ping.js
module.exports = {
  name: "ping",
  category: "Fun", // Facultatif
  description: "Permet de faire Ping Pong", // Facultatif
  aliases: ["p"], // Facultatif
  run: (client, message, args) => {
    // ...
  },
};

// Fichier pingSlash.js
module.exports = {
  name: "ping",
  description: "Permet de faire Ping Pong",
  run: (client, interaction) => {
    // ...
  },
};
```

Typescript

```ts
// Fichier message.ts
import { Event } from "@natchi/discordjs-handler";

export const event: Event = {
  name: "message",
  run: (client, message) => {
    // ...
  },
};

// Fichier ping.ts
import { Command } from "@natchi/discordjs-handler";

export const command: Command = {
  name: "ping",
  category: "Fun", // Facultatif
  description: "Permet de faire Ping Pong", // Facultatif
  alises: ["p"], // Facultatif
  run: (client, message, args) => {
    // ...
  },
};

// Fichier pingSlash.ts
import { SlashCommand } from "@natchi/discordjs-handler";

export const slashCommand: SlashCommand = {
  name: "ping",
  description: "Permet de faire Ping Pong",
  run: (client, interaction) => {
    // ...
  },
};
```
