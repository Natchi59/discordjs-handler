import { ChatInputApplicationCommandData, Client, CommandInteraction } from "discord.js";

export interface SlashCommand extends ChatInputApplicationCommandData {
  run(client: Client, interaction: CommandInteraction): any | Promise<any>;
}
