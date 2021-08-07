import { Client, ClientEvents } from "discord.js";

export interface Event {
  name: keyof ClientEvents;
  run (client: Client, ...args: Array<any>): Promise<any> | any;
}