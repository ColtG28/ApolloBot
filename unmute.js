module.exports = {
    name: 'unmute',
    description: 'Unmute a user by mention or ID',
    execute(message, args) {
      // Check if the user has the MANAGE_ROLES permission
      if (!message.member.permissions.has('MANAGE_ROLES')) {
        return message.reply('You do not have permission to use this command.');
      }
  
      // Implement unmute logic here
      if (args.length < 1) {
        return message.reply('Please mention a user or provide a user ID to unmute.');
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
  
      // Set the muted role ID
      const mutedRoleId = '1195987857668571227';
      const mutedRole = message.guild.roles.cache.get(mutedRoleId);
  
      if (!mutedRole) {
        return message.reply('The muted role does not exist. Make sure it is correctly set up.');
      }
  
      const member = message.guild.members.cache.get(user);
  
      if (!member) {
        return message.reply('Invalid user mention or user ID.');
      }
  
      member.roles.remove(mutedRole)
        .then(() => {
          message.reply(`Successfully unmuted user with ID: ${user}`);
        })
        .catch(error => {
          console.error(`Error unmuting user: ${error}`);
          message.reply('There was an error while trying to unmute the user.');
        });
    },
  };
  