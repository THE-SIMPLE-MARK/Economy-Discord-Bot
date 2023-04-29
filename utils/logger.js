import pkg from "winston"
const { createLogger, format, transports } = pkg
import { bgRed, cyan, gray, magenta, red, yellow } from "colorette"

function colorByLevel(text, level) {
  switch (level) {
    case "trace":
      return gray(text)
    case "debug":
      return magenta(text)
    case "info":
      return cyan(text)
    case "warn":
      return yellow(text)
    case "error":
      return red(text)
    case "fatal":
      return bgRed(text)
    default:
      return text
  }
}

export const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(
          i =>
            `${colorByLevel(i.timestamp, i.level)} — ${colorByLevel(
              i.level.toUpperCase(),
              i.level
            )} — ${i.message}`
        )
      ),
    }),
  ],
})