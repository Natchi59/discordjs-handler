import { Client, Collection } from "discord.js";
import { DirOptions, HandlerOptions } from "../interfaces/Options";
import { handlerButtons } from "./handlerButtons";
import { handlerCommands } from "./handlerCommands";
import { handlerEvents } from "./handlerEvents";
import { handlerSelectMenus } from "./handlerSelectMenus";
import { handlerSlashCommands } from "./handlerSlashCommands";

/**
 * Handler permettant d'exécuter les événements et/ou les commandes
 * @param {Client} client Client discord.js
 * @param {DirOptions} dirs Le choix de l'exécution d'un handler avec le chemin du dossier
 * @param {HandlerOptions} options Options du handler
 */
export async function handler(
  client: Client,
  dirs: DirOptions,
  options: HandlerOptions
): Promise<any> {
  client.handler = {
    events: dirs?.events ? new Collection() : null,
    commands: dirs?.commands ? new Collection() : null,
    aliases: dirs?.commands ? new Collection() : null,
    slashCommands: dirs?.slashCommands ? new Collection() : null,
    buttons: dirs?.buttons ? new Collection() : null,
    selectMenus: dirs?.selectMenus ? new Collection() : null,
  };

  if (dirs?.events) await handlerEvents(client, dirs.events, options);
  if (dirs?.commands) await handlerCommands(client, dirs.commands, options);
  if (dirs?.slashCommands)
    await handlerSlashCommands(client, dirs.slashCommands, options);
  if (dirs?.buttons) await handlerButtons(client, dirs.buttons, options);
  if (dirs?.selectMenus)
    await handlerSelectMenus(client, dirs.selectMenus, options);
}
