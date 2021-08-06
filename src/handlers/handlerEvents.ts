import { Client, Collection } from "discord.js";
import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import { Event, HandlerOptions } from "../interfaces";

/**
 * Handler des événements
 * @param {Client} client Client avec les collection du handler
 * @param {String} dirEvents Nom du dossier des événements
 * @param {HandlerOptions} options Options du handler
 */
export async function handlerEvents(
  client: Client,
  dirEvents: string,
  options?: HandlerOptions
): Promise<any> {
  if (!require.main) return;

  client.handler.events = new Collection();

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
      let event: Event = require(pathFile);
      if (lang === "ts") {
        event = require(pathFile).event;
        if (!event)
          throw new SyntaxError(
            `L'export dans le fichier ${file} doit se faire avec une constante nommée event`
          );
      }

      if (!event.name || !event.run)
        throw new ReferenceError(
          `Le fichier ${file} ne possède pas les valeurs obligatoires de l'interface Event`
        );

      client.handler.events.set(event.name, event);
      client.on(event.name, event.run.bind(null, client));
    }
  }
}
