/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */
import {
  MessageFlags,
} from "discord.js";
import { anime } from "../assets/anime.js";
import { cats } from "../assets/cats.js";
import { getArtComponents } from "../modules/getArtComponents.js";
import { sendUnentitledResponse } from "../modules/sendUnentitledResponse.js";
import { checkGuildEntitlement } from "../utils/checkEntitlement.js";
import { errorHandler } from "../utils/errorHandler.js";
import { getRandomValue } from "../utils/getRandomValue.js";
import type { Ascii } from "../interfaces/ascii.js";
import type { Command } from "../interfaces/command.js";

type Category = "anime" | "cats";

const isValidCategory = (category: string): category is Category => {
  return [ "anime", "cats" ].includes(category);
};

const getCategoryList = (category: Category): Array<Ascii> => {
  switch (category) {
    case "anime":
      return anime;
    case "cats":
      return cats;
    default:
      return [];
  }
};

/**
 * Handles the `/ascii` command interaction.
 * @param chibika - Chibika's Discord instance (unused).
 * @param interaction - The command interaction payload from Discord.
 */
export const ascii: Command = async(chibika, interaction) => {
  try {
    const isEntitled = await checkGuildEntitlement(chibika, interaction.guild);
    if (!isEntitled) {
      await sendUnentitledResponse(interaction);
      return;
    }
    const category = interaction.options.getString("category", true);
    if (!isValidCategory(category)) {
      await interaction.reply({
        content: `Invalid category: ${category}. Valid categories are: anime, cats.`,
      });
      return;
    }
    const components = getArtComponents(
      getRandomValue(getCategoryList(category)),
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
