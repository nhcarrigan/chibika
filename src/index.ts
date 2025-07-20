/**
 * @copyright nhcarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import {
  Client,
  Events,
  GatewayIntentBits,
} from "discord.js";
import { chatInputInteractionCreate } from "./events/interactionCreate.js";
import { instantiateServer } from "./server/serve.js";
import { logger } from "./utils/logger.js";

const chibika = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

chibika.once(Events.ClientReady, () => {
  void logger.log(
    "debug",
    `Logged in as ${chibika.user?.username ?? "unknown"}`,
  );
});

chibika.on(Events.InteractionCreate, (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (!interaction.inCachedGuild()) {
      void interaction.reply({
        content: "How did you get here? This command is not available in DMs.",
      });
      return;
    }
    void chatInputInteractionCreate(chibika, interaction);
  }
});

await chibika.login(process.env.DISCORD_TOKEN);
instantiateServer();
