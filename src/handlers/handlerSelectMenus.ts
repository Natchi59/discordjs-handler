import { Client } from "discord.js";
import { join, extname } from "path";
import { readdir, stat } from "fs/promises";
import { SelectMenu, HandlerOptions } from "../interfaces";

/**
 * Handler des commandes
 * @param {Client} client Client discord.js
 * @param {String} dirSelectMenus Chemin du dossier des Menus de sélection
 * @param {HandlerOptions} options Options du handler
 */
export async function handlerSelectMenus(
  client: Client,
  dirSelectMenus: string,
  options?: HandlerOptions
): Promise<any> {
  if (!require.main) return;

  const pathSelectMenus = join(require.main.path, dirSelectMenus);
  let filesSelectMenus = null;
  try {
    filesSelectMenus = await readdir(pathSelectMenus);
  } catch (err) {
    throw new ReferenceError(`Le dossier ${dirSelectMenus} n'existe pas`);
  }

  for (const file of filesSelectMenus) {
    const pathFile = join(pathSelectMenus, file);
    const statFile = await stat(pathFile);

    if (statFile.isDirectory())
      handlerSelectMenus(client, join(dirSelectMenus, file), options);

    const lang = options?.lang ? options.lang : "js";
    if (extname(pathFile) === `.${lang}`) {
      let selectMenu: SelectMenu = require(pathFile);
      if (lang === "ts") {
        selectMenu = require(pathFile).selectMenu;
        if (!selectMenu)
          throw new SyntaxError(
            `L'export dans le fichier ${file} doit se faire avec une constante nommée "selectMenu"`
          );
      }

      if (!selectMenu.customId || !selectMenu.run)
        throw new ReferenceError(
          `Le fichier ${file} ne possède pas "customId" ou "run()"`
        );

      if (client.handler.selectMenus) {
        client.handler.selectMenus.set(selectMenu.customId, selectMenu);
      }
    }
  }
}
