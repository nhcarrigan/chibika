/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import type { ChatInputCommandInteraction, Client } from "discord.js";

export type Command = (
  chibika: Client,
  interaction: ChatInputCommandInteraction<"cached">
)=> Promise<void>;
