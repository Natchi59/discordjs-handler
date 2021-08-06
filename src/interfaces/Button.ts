import { ButtonInteraction, Client } from "discord.js";

export interface Button {
  customId: string;
  run(client: Client, interaction: ButtonInteraction): any | Promise<any>;
}
