import { ApplicationCommandData, Client, CommandInteraction } from "discord.js";

export interface SlashCommand extends ApplicationCommandData {
  run(client: Client, interaction: CommandInteraction): any | Promise<any>;
}
