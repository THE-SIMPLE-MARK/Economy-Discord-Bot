import { Client, GatewayIntentBits, Collection, ActivityType } from "discord.js"
import { commands, events } from "./utils/registry.js"
import "dotenv/config"

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    allowedMentions: { repliedUser: false },
    presence: {
        activities: [{ name: "slash commands.", type: ActivityType.Listening }]
    }
})

client.commands = new Collection()

// initialize commands and events
await commands(client, "./commands")
await events(client, "./events")

await client.login(process.env.TOKEN)