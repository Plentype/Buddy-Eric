const { REST, Routes } = require('discord.js');

const TOKEN = process.env['TOKEN'], CLIENT_ID = process.env['CLIENT_ID'];

const commands = [
  {
    name: 'amogus',
    description: 'Sends a random amogus GIF.',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TENOR_TOKEN = process.env['TENOR_TOKEN'];
const url = `https://tenor.googleapis.com/v2/search?key=${TENOR_TOKEN}&client_key=Buddy_Eric&q=amogus&media_filter=gif&random=true&limit=1`;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'amogus') {
    fetch(url)
      .then(data => data.json())
      .then(res => interaction.reply(res.results[0].url));
  }
});

client.login(TOKEN);