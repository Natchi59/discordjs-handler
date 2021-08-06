import { Client } from "discord.js";
import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import { SlashCommand, HandlerOptions } from "../interfaces";

/**
 * Handler des commandes
 * @param {Client} client Client discord.js
 * @param {String} dirSlashCommands Chemin du dossier des Slashcommands
 * @param {HandlerOptions} options Options du handler
 */
export async function handlerSlashCommands(
  client: Client,
  dirSlashCommands: string,
  options?: HandlerOptions
): Promise<any> {
  if (!require.main) return;

  const pathSlashCommands = join(require.main.path, dirSlashCommands);
  let filesSlashCommands = null;
  try {
    filesSlashCommands = await readdir(pathSlashCommands);
  } catch (err) {
    throw new ReferenceError(`Le dossier ${dirSlashCommands} n'existe pas`);
  }

  for (const file of filesSlashCommands) {
    const pathFile = join(pathSlashCommands, file);
    const statFile = await stat(pathFile);

    if (statFile.isDirectory())
      handlerSlashCommands(client, join(dirSlashCommands, file), options);

    const lang = options?.lang ? options.lang : "js";
    if (extname(pathFile) === `.${lang}`) {
      let slashCommand: SlashCommand = require(pathFile);
      if (lang === "ts") {
        slashCommand = require(pathFile).slashcommand;
        if (!slashCommand)
          throw new SyntaxError(
            `L'export dans le fichier ${file} doit se faire avec une constante nommée "slashCommand"`
          );
      }

      if (!slashCommand.name || !slashCommand.run)
        throw new ReferenceError(
          `Le fichier ${file} ne possède pas "name" ou "run()"`
        );

      if (client.handler.slashcommands) {
        client.handler.slashcommands.set(slashCommand.name, slashCommand);
      }
    }
  }
}