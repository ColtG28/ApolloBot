module.exports = {
    name: 'clear',
    description: 'Clear a specified number of messages',
    execute(message, args) {
      // Check if the user has permission to manage messages
      if (!message.member.permissions.has('MANAGE_MESSAGES')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      // Parse the number of messages to clear
      const amount = parseInt(args[0]);
  
      // Check if the amount is a valid number
      if (isNaN(amount) || amount <= 0) {
        return message.reply('Please provide a valid number greater than 0.');
      }
  
      // Check if the amount is within the allowed range (1 to 1000)
      if (amount > 1000) {
        return message.reply('You can clear up to 1000 messages at a time.');
      }
  
      // Fetch and delete messages
      message.channel.messages.fetch({ limit: amount + 1 }) // Fetch one extra to include the command message
        .then(messages => {
          message.channel.bulkDelete(messages, true);
          message.reply(`Cleared ${amount} messages.`);
        })
        .catch(error => {
          console.error(error);
          message.reply('There was an error while trying to clear messages.');
        });
    },
  };
  