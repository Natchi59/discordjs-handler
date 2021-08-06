import { Client, Collection } from "discord.js";
import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import { Command, HandlerOptions } from "../interfaces";

/**
 * Handler des commandes
 * @param {Client} client Client discord.js
 * @param {String} dirCommands Chemin du dossier des Commandes
 * @param {HandlerOptions} options Options du handler
 */
export async function handlerCommands(
  client: Client,
  dirCommands: string,
  options: HandlerOptions
): Promise<any> {
  if (!require.main) return;

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

    if (extname(pathFile) === `.${options.lang}`) {
      let command: Command = require(pathFile);
      if (options.lang === "ts") {
        command = require(pathFile).command;
        if (!command)
          throw new SyntaxError(
            `L'export dans le fichier ${file} doit se faire avec une constante nommée "command"`
          );
      }

      if (!command.name || !command.run)
        throw new ReferenceError(
          `Le fichier ${file} ne possède pas "name" ou "run()"`
        );

      if (client.handler.commands) {
        client.handler.commands.set(command.name, command);
        if (command.aliases && command.aliases.length > 0) {
          command.aliases.forEach((alias) => {
            if (client.handler.aliases)
              client.handler.aliases.set(alias, command);
          });
        }
      }
    }
  }
}
