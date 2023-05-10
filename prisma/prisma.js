import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logger.js"
import { blue } from "colorette"

const prismaInstance = global.prisma || new PrismaClient()

prismaInstance.$on("query", data => {
  logger.debug(`${blue("New Prisma query:")} ${data.query}`)
})

export const prisma = prismaInstance
