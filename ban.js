module.exports = {
    name: 'ban',
    description: 'Ban a user from the server by mention or ID',
    execute(message, args) {
      // Check if the user has the BAN_MEMBERS permission
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      // Implement ban logic here
      if (args.length < 1) {
        return message.reply('Please mention a user or provide a user ID to ban.');
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
  
      message.guild.members.ban(user)
        .then(() => {
          message.reply(`Successfully banned user with ID: ${user}`);
        })
        .catch(error => {
          console.error(`Error banning user: ${error}`);
          message.reply('There was an error while trying to ban the user.');
        });
    },
  };
  