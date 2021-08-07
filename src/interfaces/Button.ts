import {
  Client,
  ButtonInteraction,
  InteractionButtonOptions,
} from "discord.js";

export interface Button extends InteractionButtonOptions {
  run(client: Client, interaction: ButtonInteraction): any | Promise<any>;
}
