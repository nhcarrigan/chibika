/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder,
} from "discord.js";
import type { Ascii } from "../interfaces/ascii.js";

/**
 * Generates the components for an ASCII art response.
 * @param art - The ASCII art object containing text and author.
 * @returns An array of components including text display and action row with a button.
 */
export const getArtComponents = (
  art: Ascii,
): [ContainerBuilder, ActionRowBuilder<ButtonBuilder>] => {
  const { text, author } = art;
  return [
    new ContainerBuilder().
      addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`\`\`\`ascii\n${text}\n\`\`\``),
      ).
      addSeparatorComponents(
        new SeparatorBuilder().
          setSpacing(SeparatorSpacingSize.Small).
          setDivider(true),
      ).
      addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`-# ${author}`),
      ),
    new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder().
        setStyle(ButtonStyle.Link).
        setLabel("Submit Your Own!").
        setURL(
          // eslint-disable-next-line stylistic/max-len -- Big boi string.
          "https://forms.nhcarrigan.com/form/7hS-YIBXGlDljGYk6NMI5GQWLLvOqXIMCga_HI87F68",
        ),
    ),
  ];
};
