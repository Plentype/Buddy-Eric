const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TENOR_TOKEN = process.env('TENOR_TOKEN');
const url = `https://tenor.googleapis.com/v2/search?${TENOR_TOKEN}&client_key=Buddy_Eric&q=amogus&media_filter=gif&random=true`;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  fetch(url)
      .then(data => data.json())
      .then(res => console.log(res))
      .catch(console.error('API Call failed.'));
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'amogus') {
    fetch(url)
      .then(data => data.json())
      .then(res => console.log(res))
      .catch(console.error('API Call failed.'));
  }
});

client.login(TOKEN);