// Load environment variables (from .env file)
require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

// --- 1. EXPRESS SERVER (Satisfies Render Port Binding) ---
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bigman is alive and running!');
});

// We bind to 0.0.0.0 so Render can "see" the port
app.listen(port, '0.0.0.0', () => {
    console.log(`Web server listening on port ${port}`);
});

// --- 2. DISCORD BOT SETUP ---
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Log in using your token from the .env file
client.login(process.env.DISCORD_TOKEN);
