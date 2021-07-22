import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import { HandlerOptions } from "../interfaces/Options";
import { ClientHandler } from "../client";

/**
 * Handler des commandes
 * @param {ClientHandler} client Client avec les collection du handler
 * @param {String} dirCommands Nom du dossier des commandes
 * @param {HandlerOptions} options Options du handler
 */
export async function handlerCommands(
  client: ClientHandler,
  dirCommands: string,
  options?: HandlerOptions
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
