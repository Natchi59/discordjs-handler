import { Client } from "discord.js";
import { DirOptions, HandlerOptions } from "../interfaces/Options";
import { handlerCommands } from "./handlerCommands";
import { handlerEvents } from "./handlerEvents";

/**
 * Handler permettant d'exécuter les événements et/ou les commandes
 * @param {Client} client Client avec les collection du handler
 * @param {DirOptions} dirs Le choix de l'exécution d'un handler avec le nom du dossier
 * @param {HandlerOptions} options Options du handler
 */
export async function handler(
  client: Client,
  dirs: DirOptions,
  options: HandlerOptions
): Promise<any> {
  if (dirs?.events) await handlerEvents(client, dirs.events, options);
  if (dirs?.commands) await handlerCommands(client, dirs.commands, options);
}
