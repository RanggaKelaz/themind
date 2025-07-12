const { Telegraf } = require("telegraf");
const express = require("express"); // Import express
const config = require("./config");
const mainHandler = require("./main");

const bot = new Telegraf(config.BOT_TOKEN);
const app = express(); // Create express app

// Basic ping endpoint for uptime monitoring
app.get("/ping", (req, res) => {
  res.status(200).send("Bot is alive!");
});

// Start the express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

bot.start((ctx) => ctx.reply("Selamat datang! Saya adalah WormGPT. Gunakan perintah .wormgpt untuk melihat daftar perintah."));
bot.help((ctx) => ctx.reply("Gunakan perintah .wormgpt untuk melihat daftar perintah."));

bot.on("text", async (ctx) => {
  const text = ctx.message.text;
  const sender = ctx.from.id; // Telegram user ID

  // Mock sock and msg objects for compatibility with mainHandler
  const sock = {
    sendMessage: async (chatId, options) => {
      if (options.text) {
        await ctx.reply(options.text);
      } else if (options.document) {
        // For document, we need to send it as a file
        // Telegram bot API requires file_id or URL for document
        // For now, we'll just send the caption as text
        await ctx.reply(options.caption || "File sent.");
      }
    }
  };

  const msg = {
    key: { remoteJid: ctx.chat.id } // Mock remoteJid with chat ID
  };

  await mainHandler(sock, msg, text, sender);
});

bot.launch();

console.log("Telegram bot started!");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));


