import { logger } from "../utils/logger.js"
import { EmbedBuilder } from "discord.js"

export const name = "interactionCreate"

const maintenanceMode = new EmbedBuilder()
  .setColor("Blue")
  .setTitle("Currently Under Maintenance")
  .setDescription(
    "EconoBot is currently under maintenance and will start fulfilling your requests again soon."
  )
  .setFooter({
    text: "Tally - Your guide to Stormy Awards.",
    iconURL: process.env.AVATAR_URL,
  })

export const execute = async (client, interaction) => {
  if (!interaction.guild)
    return await interaction.reply({
      content: "This command can only be used in a server!",
    })

  // maintenance mode
  if (
    process.env.MAINTENANCE_MODE === true &&
    !(
      interaction.member?.permissions.has("Administrator") ||
      process.env.MAINTENANCE_WHITELIST.includes(interaction.user.id)
    )
  )
    return await interaction.reply({
      embeds: [maintenanceMode],
      ephemeral: true,
    })

  if (interaction.isCommand()) {
    if (!client.commands.has(interaction.commandName)) return

    try {
      await client.commands
        .get(interaction.commandName)
        .execute(client, interaction)
    } catch (error) {
      logger.error(
        `Error while trying to execute application command [${interaction.commandId}]${interaction.commandName} ran by [${interaction.user.id}]${interaction.user.username} in guild [${interaction.guildId}]${interaction.guild.name}.`
      )
      console.error(error)
      client.emit("commandError", client, interaction, error)
    }
  }
}
