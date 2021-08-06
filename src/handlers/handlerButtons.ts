import { Client } from "discord.js";
import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import { Button, HandlerOptions } from "../interfaces";

/**
 * Handler des commandes
 * @param {Client} client Client discord.js
 * @param {String} dirButtons Chemin du dossier des Boutons
 * @param {HandlerOptions} options Options du handler
 */
export async function handlerButtons(
  client: Client,
  dirButtons: string,
  options: HandlerOptions
): Promise<any> {
  if (!require.main) return;

  const pathButtons = join(require.main.path, dirButtons);
  let filesButtons = null;
  try {
    filesButtons = await readdir(pathButtons);
  } catch (err) {
    throw new ReferenceError(`Le dossier ${dirButtons} n'existe pas`);
  }

  for (const file of filesButtons) {
    const pathFile = join(pathButtons, file);
    const statFile = await stat(pathFile);

    if (statFile.isDirectory())
      handlerButtons(client, join(dirButtons, file), options);

    if (extname(pathFile) === `.${options.lang}`) {
      let button: Button = require(pathFile);
      if (options.lang === "ts") {
        button = require(pathFile).button;
        if (!button)
          throw new SyntaxError(
            `L'export dans le fichier ${file} doit se faire avec une constante nommée "button"`
          );
      }

      if (!button.customId || !button.run)
        throw new ReferenceError(
          `Le fichier ${file} ne possède pas "customId" ou "run()"`
        );

      if (client.handler.buttons) {
        client.handler.buttons.set(button.customId, button);
      }
    }
  }
}
