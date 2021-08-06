import { Collection } from "discord.js";
import { Event, Command } from "./interfaces";

export { handler } from "./handlers";
export { Event, Command } from "./interfaces";

declare module "discord.js" {
  interface Client {
    handler: {
      events: Collection<string, Event> | null;
      commands: Collection<string, Command> | null;
      aliases: Collection<string, Command> | null;
    };
  }
}
