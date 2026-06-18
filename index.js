// Add this at the very top of your file
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Bigman is active!');
});

app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

// ... your existing Discord bot code starts below here ...
console.log("--- BOT IS STARTING UP ---");
require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

// Create the bot client with permissions to read messages
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, message => {
    // 1. Ignore if the author is a bot (prevents infinite loops)
    if (message.author.bot) return;

    // 2. Check if the message mentions the bot OR contains the word "bigman"
    const isMention = message.mentions.has(client.user);
    const isName = message.content.toLowerCase().includes('bigman');

    // 3. Only respond if one of those conditions is true
    if (isMention || isName) {
        message.reply("You called? Bigman is here.");
    }
});

// Log in using the secure token from your Environment Variables
client.login(process.env.DISCORD_TOKEN);
const discordToken = process.env.DISCORD_TOKEN;
const otherKey = process.env.OTHER_API_KEY;

// Now you can use them wherever you need
console.log("My bot is using the token:", discordToken);