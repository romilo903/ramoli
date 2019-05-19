const Discord = require('discord.js');

  exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || message.author;
    
    let avatar = user.avatarURL;
    if (!avatar) avatar = user.defaultAvatarURL;
    
  let embed = new Discord.RichEmbed()
  .setColor([244, 173, 66])
  .setTitle("🖼Avatar de " + user.username)
  .setDescription("Baixe [aqui](" + avatar + ")")
  .setImage(avatar)
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp(); 

  message.channel.send(embed);
    
  }