import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import { Client, Collection, ClientEvents, Message } from "discord.js";

export interface Event {
  name: keyof ClientEvents;
  run(client: Client, ...args: Array<any>): any | Promise<any>;
}

export interface Command {
  name: string;
  category?: string;
  description?: string;
  alises?: string;
  run(
    client: Client,
    message: Message,
    args: Array<string>
  ): any | Promise<any>;
}

export class ClientHandler extends Client {
  public events = new Collection<string, Event>();
  public commands = new Collection<string, Command>();
  public aliases = new Collection<string, Command>();
}

type langOption = "ts" | "js";

interface OptionsHandler {
  lang: langOption;
}

interface DirOptions {
  events?: string;
  commands?: string;
}

/**
 * Handler des événements
 * @param {ClientHandler} client Client discord.js
 * @param {string} dirEvents Nom du dossier où sont stockés les événements
 * @param {OptionsHandler} options Options proposées pour le handler
 */
async function handlerEvents(
  client: ClientHandler,
  dirEvents: string,
  options?: OptionsHandler
): Promise<void> {
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

    if (statFile.isDirectory())
      handlerEvents(client, join(dirEvents, file), options);

    const lang = options?.lang ? options.lang : "js";
    if (extname(pathFile) === `.${lang}`) {
      let event = require(pathFile);
      if (lang === "ts") {
        event = event.event;
        if (!event)
          throw new SyntaxError(
            `L'export dans le fichier ${file} doit se faire avec une constante nommée event`
          );
      }

      if (!event.name || !event.run)
        throw new ReferenceError(
          `Le fichier ${file} ne possède pas les valeurs obligatoires de l'interface Event`
        );

      client.events.set(event.name, event);
      client.on(event.name, event.run.bind(null, client));
    }
  }
}

/**
 * Handler des commandes
 * @param {ClientHandler} client Client discord.js
 * @param {string} dirEvents Nom du dossier où sont stockés les événements
 * @param {OptionsHandler} options Options proposées pour le handler
 */
async function handlerCommands(
  client: ClientHandler,
  dirCommands: string,
  options?: OptionsHandler
): Promise<void> {
  const pathCommands = join(require.main.path, dirCommands);
  let filesCommands = null;
  try {
    filesCommands = await readdir(pathCommands);
  } catch (err) {
    throw new ReferenceError(`Le dossier ${dirCommands} n'existe pas`);
  }

  for (const file of filesCommands) {
    const pathFile = join(pathCommands, file);
    const statFile = await stat(pathFile);

    if (statFile.isDirectory())
      handlerCommands(client, join(dirCommands, file), options);

    const lang = options?.lang ? options.lang : "js";
    if (extname(pathFile) === `.${lang}`) {
      let command = require(pathFile);
      if (lang === "ts") {
        command = command.command;
        if (!command)
          throw new SyntaxError(
            `L'export dans le fichier ${file} doit se faire avec une constante nommée command`
          );
      }

      if (!command.name || !command.run)
        throw new ReferenceError(
          `Le fichier ${file} ne possède pas les valeurs obligatoires de l'interface Command`
        );

      client.commands.set(command.name, command);
      if (command.aliases?.length > 0) {
        command.alises.forEach((alias: string) => {
          client.aliases.set(alias, command);
        });
      }
    }
  }
}

/**
 *
 * @param {ClientHandler} client Client Discord.js avec les collections 'events', 'commands' et 'aliases'.
 * @param {DirOptions} dir Choix des noms des dossiers d'événements et des commandes à exécuter.
 * @param {OptionsHandler} options Options du Handler proposées.
 */
export async function handler(
  client: ClientHandler,
  dir?: DirOptions,
  options?: OptionsHandler
): Promise<void> {
  if (!(client instanceof ClientHandler))
    throw new ReferenceError(
      `Le client ne possède pas la même instance que ClientHandler`
    );

  if (dir?.events) await handlerEvents(client, dir.events, options);
  if (dir?.commands) await handlerCommands(client, dir.commands, options);
}
