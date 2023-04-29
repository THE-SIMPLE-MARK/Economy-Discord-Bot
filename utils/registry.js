import * as fs from "fs/promises"
import { logger } from "./logger.js"

const commands = async (client, dir) => {
  logger.info("Application Commands: Initializing...")
  client.initStartTime = performance.now()

  const files = await fs.readdir(dir).catch(() => [])

  if (!files) return

  for await (const file of files) {
    if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
      await commands(client, `./${dir}/${file}`)
      continue
    }

    const command = await import(`../${dir}/${file}`)
    if (!command.data) continue
    await client.commands.set(command.data.name, command)
  }
}

const events = async (client, dir) => {
  const files = await fs.readdir(dir).catch(() => [])

  if (!files) return

  for await (const file of files) {
    if ((await fs.stat(`./${dir}/${file}`)).isDirectory()) {
      await events(client, `./${dir}/${file}`)
      continue
    }

    const event = await import(`../${dir}/${file}`)

    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args))
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args))
    }
  }
}

export { commands, events }