import { Client, Collection } from "discord.js";
import { Event } from "../interfaces/Event";
import { Command } from "../interfaces/Command";

export class ClientHandler extends Client {
  public events = new Collection<string, Event>();
  public commands = new Collection<string, Command>();
  public aliases = new Collection<string, Command>();
}
