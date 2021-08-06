import { Client, Message } from "discord.js";

/**
 * Interface de commande
 */
export interface Command {
  name: string;
  category?: string;
  description?: string;
  aliases?: Array<string>;
  run (client: Client, message: Message, args: Array<string>): Promise<any> | any;
}