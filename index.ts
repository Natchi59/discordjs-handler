import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import { Event, Command, ClientHandler } from "@natchi/discordjs-handler";

/**
 * Handler des événements
 * @param {ClientHandler} client Client discord.js
 * @param {string} dirEvents Nom du dossier où sont stockés les événements
 */
export async function handlerEvents(client: ClientHandler, dirEvents: string) {
  if (!client.events)
    throw new ReferenceError(
      `Le client ne possède pas de collection dans client.events`
    );

  const pathEvents = join(require.main.path, dirEvents);
  let filesEvents = null;
  try {
    filesEvents = await readdir(pathEvents);
  } catch (err) {
    throw new ReferenceError(`Le dossier ${dirEvents} n'existe pas`);
  }

  for (const file of filesEvents) {
    const pathFile = join(pathEvents, file);
    const statFile = await stat(pathFile);

    if (statFile.isDirectory()) handlerEvents(client, join(dirEvents, file));

    if (extname(pathFile) === ".js") {
      const event = require(pathFile);

      if (!event.name || !event.run)
        throw new ReferenceError(
          `Le fichier ${file} ne possède pas le bon schéma d'handler d'événement`
        );

      client.events.set(event.name, event);
      client.on(event.name, event.run.bind(null, client));
    }
  }
}

// /**
//  * Handler des commandes
//  * @param {Client} client Client discord.js
//  * @param {string} dirCommands Nom du dossier où sont stockés les commandes
//  */
// export async function handlerCommands(client, dirCommands) {
//   if (!client.commands)
//     throw new ReferenceError(
//       `Le client ne possède pas de collection dans client.commands`
//     );
//   if (!client.aliases)
//     throw new ReferenceError(
//       `Le client ne possède pas de collection dans client.aliases`
//     );

//   const pathCommands = join(require.main.path, dirCommands);
//   let filesCommands = null;
//   try {
//     filesCommands = await readdir(pathCommands);
//   } catch (err) {
//     throw new ReferenceError(`Le dossier ${dirCommands} n'existe pas`);
//   }

//   for (const file of filesCommands) {
//     const pathFile = join(pathCommands, file);
//     const statFile = await stat(pathFile);

//     if (statFile.isDirectory())
//       handlerCommands(client, join(dirCommands, file));

//     if (extname(pathFile) === ".js") {
//       const command = require(pathFile);

//       if (!command.name || !command.run)
//         throw new ReferenceError(
//           `Le fichier ${file} ne possède pas le bon schéma d'handler de commande`
//         );

//       client.commands.set(command.name, command);

//       if (command.aliases && command.aliases.length > 0) {
//         command.aliases.forEach((alias) => {
//           client.aliases.set(alias, command);
//         });
//       }
//     }
//   }
// }
