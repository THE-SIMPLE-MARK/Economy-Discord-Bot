import { logger } from "../utils/logger.js"

export const name = "ready"
export const once = true

export const execute = async client => {
  // register commands
  const commands = client.commands.map(command => command.data)
  await client.guilds.cache.get(process.env.GUILD_ID)?.commands.set(commands)

  const execEndTime = performance.now()
  logger.info(
    `Application Commands: Took ${Math.round(
      execEndTime - client.initStartTime
    )}ms to initialize.`
  )

  logger.info(`Logged in as ${client.user.tag}`)
}
