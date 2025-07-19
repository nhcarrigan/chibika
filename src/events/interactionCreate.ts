/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import { about } from "../commands/about.js";
import { ascii } from "../commands/ascii.js";
import { emoji } from "../commands/emoji.js";
import type { Command } from "../interfaces/command.js";
import type { ChatInputCommandInteraction, Client } from "discord.js";

const handlers: { _default: Command } & Record<string, Command> = {
  _default: async(_, interaction): Promise<void> => {
    await interaction.reply({
      content: `Unknown command: ${interaction.commandName}`,
    });
  },
  about: about,
  ascii: ascii,
  emoji: emoji,
};

/**
 * Processes a slash command.
 * @param chibika - Chibika's Discord instance.
 * @param interaction - The command interaction payload from Discord.
 */
const chatInputInteractionCreate = async(
  chibika: Client,
  interaction: ChatInputCommandInteraction<"cached">,
): Promise<void> => {
  const name = interaction.commandName;
  // eslint-disable-next-line no-underscore-dangle -- We use _default as a fallback handler.
  const handler = handlers[name] ?? handlers._default;
  await handler(chibika, interaction);
};

export { chatInputInteractionCreate };
