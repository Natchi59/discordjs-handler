declare module "@natchi/discordjs-handler" {
  import { Client, Message, ClientEvents, Collection } from "discord.js";

  export interface Event {
    name: keyof ClientEvents;
    run (client: Client, ...args: Array<any>): any | Promise<any>;
  }

  export interface Command {
    name: string;
    category?: string;
    description?: string;
    alises?: string;
    run (client: Client, message: Message, args: Array<string>): any | Promise<any>;
  }

  export class ClientHandler extends Client {
    public events: Collection<string, Event>;
    public commands: Collection<string, Command>;
    public aliases: Collection<string, Command>;
  }
}
