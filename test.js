const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Info
const botID = '1195907530841399436';
const serverID = '925239293545418782';
const botToken = process.env.DISCORD_TOKEN;

const rest = new REST({ version: '9' }).setToken(botToken);

const slashRegister = async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(botID, serverID),
      {
        body: [
          {
            name: 'test_command',
            description: 'Test command.',
          },
        ],
      }
    );
    console.log('Successfully registered slash commands.');
  } catch (error) {
    console.error(error);
  }
};

slashRegister();
