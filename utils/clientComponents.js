import { EmbedBuilder } from "discord.js"

// this is defined here, so it can be easily read from the functions in the object
const colors = {
  main: "#206694", // EconoBot blue
  error: "#ED4245", // red
  success: "#57F287", // green
  nominee: "#1ABC9C", // aqua
}

export default function loadClientResources() {
  const footerData = {
    text: "EconoBot - Economy management made easy.",
    iconURL: process.env.AVATAR_URL,
  }

  return {
    embeds: {
      /**
       * Create a success embed.
       * @param {Object} embedData The data for creating the embed.
       * @param {string} [embedData.title] The title of the embed. "Operation Successfully Completed" if not specified.
       * @param {string} [embedData.description] The description of the embed. "The operation was successfully completed." if not specified.
       */
      success(embedData) {
        return new EmbedBuilder()
          .setColor(colors.success)
          .setTitle(embedData?.title || "Operation Successfully Completed")
          .setDescription(
            embedData?.description ||
            "The operation was successfully completed."
          )
          .setFooter(footerData)
      },
      /**
       * Create an error embed.
       * @param {Object} embedData The data for creating the embed.
       * @param {string} [embedData.title] The title of the embed. "An Unexpected Error Occured" if not specified.
       * @param {string} [embedData.description] The description of the embed. "Oops! Something went really wrong this time! Please try again later." if not specified.
       */
      error(embedData) {
        return new EmbedBuilder()
          .setColor(colors.error)
          .setTitle(embedData?.title || "An Unexpected Error Occurred")
          .setDescription(
            embedData?.description ||
            "Oops! Something went really wrong this time! Please try again later."
          )
          .setFooter(footerData)
      },
      /**
       * Create a loading embed.
       * @param {Object} embedData The data for creating the embed.
       * @param {string} [embedData.title] The title of the embed. "Loading..." if not specified.
       * @param {string} [embedData.description] The description of the embed. "Please wait, this shouldn't take too long!" if not specified.
       */
      loading(embedData) {
        return new EmbedBuilder()
          .setColor(colors.main)
          .setTitle(embedData?.title || "Loading...")
          .setDescription(
            embedData?.description ||
            "Please wait, this shouldn't take too long!"
          )
          .setFooter(footerData)
      },
    },
    colors,
    footerData,
  }
}
