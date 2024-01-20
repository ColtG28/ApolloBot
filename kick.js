module.exports = {
    name: 'kick',
    description: 'Kick a user from the server by mention or ID',
    execute(message, args) {
      // Check if the user has the KICK_MEMBERS permission
      if (!message.member.permissions.has('KICK_MEMBERS')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      // Implement kick logic here
      if (args.length < 1) {
        return message.reply('Please mention a user or provide a user ID to kick.');
      }
  
      let user;
      const userMention = message.mentions.users.first();
      if (userMention) {
        // If a mention is provided, use the mentioned user's ID
        user = userMention.id;
      } else {
        // If no mention, use the provided user ID
        const userId = args[0];
        user = userId;
      }
  
      const member = message.guild.members.cache.get(user);
  
      if (!member) {
        return message.reply('Invalid user mention or user ID.');
      }
  
      member.kick()
        .then(() => {
          message.reply(`Successfully kicked user with ID: ${user}`);
          // Remove the member from the server after kicking
          member.remove();
        })
        .catch(error => {
          console.error(`Error kicking user: ${error}`);
          message.reply('There was an error while trying to kick the user.');
        });
    },
  };
  