export interface HandlerOptions {
  lang?: "ts" | "js";
}

export interface DirOptions {
  events?: string;
  commands?: string;
  slashCommands?: string;
  buttons?: string;
  selectMenus?: string;
}