import { Client, ClientEvents } from "discord.js";

/**
 * Interface d'événement
 */
export interface Event {
  name: keyof ClientEvents;
  run (client: Client, ...args: Array<any>): Promise<any> | any;
}