/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  type ChatInputCommandInteraction,
} from "discord.js";
import { unentitledImage } from "../config/entitlements.js";
import { getArtComponents } from "./getArtComponents.js";

/**
 * Responds with a default image and a button to subscribe.
 * @param interaction - The interaction object from Discord.
 */
export const sendUnentitledResponse = async(
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
  const [ container ] = getArtComponents(unentitledImage);
  const components = [
    container,
    new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().
        setStyle(ButtonStyle.Premium).
        setSKUId("1396226651620118579"),
    ),
  ];
  await interaction.reply({
    components: components,
    flags:      [ MessageFlags.IsComponentsV2 ],
  });
};
