const Discord = require('discord.js');
const emoji = require('../emoji.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
 let user = message.mentions.users.first() || message.author;
  
  let money = await db.fetch(`money_${user.id}`);
  if (money == null) money = 0;
  
  let embed = new Discord.RichEmbed()
  .setAuthor(user.tag, user.avatarURL)
  .setTitle("Dinheiro de " + user.username)
  .addField(emoji.ouro + "Dinheiro :dollar:", emoji.coin + " " + money + "$")
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setColor([210, 255, 63])
  .setTimestamp();
  
  message.channel.send(embed);
  
}