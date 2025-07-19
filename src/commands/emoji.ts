/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import {
  MessageFlags,
} from "discord.js";
import { emoji as emojiList } from "../assets/emoji.js";
import { getArtComponents } from "../modules/getArtComponents.js";
import { sendUnentitledResponse } from "../modules/sendUnentitledResponse.js";
import { checkGuildEntitlement } from "../utils/checkEntitlement.js";
import { errorHandler } from "../utils/errorHandler.js";
import { getRandomValue } from "../utils/getRandomValue.js";
import type { Command } from "../interfaces/command.js";

/**
 * Handles the `/emoji` command interaction.
 * @param chibika - Chibika's Discord instance (unused).
 * @param interaction - The command interaction payload from Discord.
 */
export const emoji: Command = async(chibika, interaction) => {
  try {
    const isEntitled = await checkGuildEntitlement(chibika, interaction.guild);
    if (!isEntitled) {
      await sendUnentitledResponse(interaction);
      return;
    }
    const components = getArtComponents(
      getRandomValue(emojiList),
    );
    await interaction.reply({
      components: components,
      flags:      MessageFlags.IsComponentsV2,
    });
  } catch (error) {
    await errorHandler(error, "about command");
    await interaction.reply({
      content:
        // eslint-disable-next-line stylistic/max-len -- Big boi string.
        "An error occurred while processing your request. Please try again later.",
    });
  }
};
