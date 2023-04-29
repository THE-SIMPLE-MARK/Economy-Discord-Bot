import { SlashCommandBuilder, Message } from "discord.js"

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Ping the bot to see if it's alive.")

export async function execute(client, interaction) {
  const msg = await interaction.reply({
    content: `Ping?`,
    ephemeral: true,
    fetchReply: true,
  })

  if (msg instanceof Message) {
    const diff = msg.createdTimestamp - interaction.createdTimestamp
    const ping = Math.round(client.ws.ping)
    return interaction.editReply(
      `Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`
    )
  }

  return interaction.editReply("Failed to retrieve ping :(")
}
