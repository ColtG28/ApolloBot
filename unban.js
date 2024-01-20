module.exports = {
    name: 'unban',
    description: 'Unban a user from the server by user ID',
    execute(message, args) {
      // Check if the user has the BAN_MEMBERS permission
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      // Implement unban logic here
      if (args.length < 1) {
        return message.reply('Please provide a user ID to unban.');
      }
  
      const userId = args[0];
  
      message.guild.members.unban(userId)
        .then(() => {
          message.reply(`Successfully unbanned user with ID: ${userId}`);
        })
        .catch(error => {
          console.error(`Error unbanning user: ${error}`);
          message.reply('There was an error while trying to unban the user.');
        });
    },
  };
  