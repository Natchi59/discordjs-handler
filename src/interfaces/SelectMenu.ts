import {
  Client,
  SelectMenuInteraction,
  MessageSelectMenuOptions,
} from "discord.js";

export interface SelectMenu extends MessageSelectMenuOptions {
  run(client: Client, interaction: SelectMenuInteraction): any | Promise<any>;
}
