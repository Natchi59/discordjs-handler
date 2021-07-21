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

Pour commencer, vous devez intégrer un total de 3 Collections (du module discord.js) sur votre Client avec comme noms `events`, `commands`, et `aliases`. Ou vous pouvez créé un nouveau client à partir de la class `ClientHandler` proposé avec le module.  
<br />**Exemples**  
Javascript

```js
// Exemple 1
const { Client, Collection } = require("discord.js");

const client = new Client();
["events", "commands", "alises"].forEach((e) => (client[e] = new Collection()));

// Exemple 2
const { ClientHandler } = require("@natchi/discordjs-handler");
const client = new ClientHandler();
```

Typescript

```ts
// Exemple 1
import { Client, Collection } from "discord.js";
import { Event, Command } from "@natchi/discordjs-handler";

class ClientDjs extends Client {
  public events = new Collection<string, Event>();
  public commands = new Collection<string, Command>();
  public aliases = new Collection<string, Command>();
}
const client = new ClientDjs();

// Exemple 2
const { ClientHandler } = require("@natchi/discordjs-handler");
const client = new ClientHandler();
```

Une fois les collections configurées, vous pouvez exécuter le handler proposé avec le module.  
Vous avez le choix d'exécuter que les événements, ou alors que les commandes, ou bien les 2 en même temps en précisant ou non le noms (et non pas le chemin) du dossier dans lequel sont stockés les fichiers d'événements ou de commandes.  
<br />**Exemple**  
Javascript

```js
const { handler } = require("@natchi/discordjs-handler");

(async () => {
  await handler(
    client,
    {
      events: "events",
      commands: "commands",
    },
    {
      lang: "js",
    }
  );
})();
```

Typescript

```ts
// Exemple 1
import { handler } from "@natchi/discordjs-handler";

(async () => {
  await handler(
    client,
    {
      events: "events",
      commands: "commands",
    },
    {
      lang: "ts",
    }
  );
})();

// Exemple 2
import { ClientHandler, handler } from "@natchi/discordjs-handler";

class Client extends ClientHandler {
  public async init() {
    await handler(
      this,
      {
        events: "events",
        commands: "commands",
      },
      {
        lang: "ts",
      }
    );
  }
}

const client = new Client();

(async () => {
  client.init();
})();
```

Pour les fichiers d'événements ou de commandes, voici le schéma à suivre selon le langage.  
Pout le langage Typescript, l'export des événements doit se faire obligatoirement par une constante avec le nom `event` et pour les commandes, une constante avec le nom `command`.  
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
  alises: ["p"], // Facultatif
  run: (client, message, args) => {
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
  }
}

// Fichier ping.ts
import { Command } from "@natchi/discordjs-handler";

export const command: Command = {
  name: "ping",
  category: "Fun", // Facultatif
  description: "Permet de faire Ping Pong", // Facultatif
  alises: ["p"], // Facultatif
  run: (client, message, args) => {
    // ...
  }
}
```
