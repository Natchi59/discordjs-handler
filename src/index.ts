import { Collection } from "discord.js";
import { Event, Command, SlashCommand, Button, SelectMenu } from "./interfaces";

export { handler } from "./handlers";
export { Event, Command, SlashCommand, Button, SelectMenu } from "./interfaces";

declare module "discord.js" {
  interface Client {
    handler: {
      events: Collection<string, Event> | null;
      commands: Collection<string, Command> | null;
      aliases: Collection<string, Command> | null;
      slashcommands: Collection<string, SlashCommand> | null;
      buttons: Collection<string, Button> | null;
      selectmenus: Collection<string, SelectMenu> | null;
    };
  }
}
