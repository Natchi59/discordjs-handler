import { Client, Collection } from "discord.js";
import { Event } from "../interfaces/Event";
import { Command } from "../interfaces/Command";

/**
 * Client discordjs avec les 3 collections pour le handler
 * @extends Client
 */
export class ClientHandler extends Client {
  public events = new Collection<string, Event>();
  public commands = new Collection<string, Command>();
  public aliases = new Collection<string, Command>();
}
