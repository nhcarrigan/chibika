import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from "discord.js";

const about = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Get information about this application.")
  .setContexts([InteractionContextType.Guild])
  .setIntegrationTypes([ApplicationIntegrationType.GuildInstall]);

const ascii = new SlashCommandBuilder()
    .setName("ascii")
    .setDescription("Get ASCII art from the bot.")
    .setContexts([InteractionContextType.Guild])
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])
    .addStringOption(option =>
        option.setName("category")
        .setDescription("The category of ASCII art to retrieve.")
        .setRequired(true)
        .addChoices(
            { name: "Anime", value: "anime" },
            { name: "Cats", value: "cats" },
        ));

const emoji = new SlashCommandBuilder()
    .setName("emoji")
    .setDescription("Get an emoji art.")
    .setContexts([InteractionContextType.Guild])
    .setIntegrationTypes([ApplicationIntegrationType.GuildInstall])

console.log(JSON.stringify([
    about.toJSON(),
    ascii.toJSON(),
    emoji.toJSON()
]));