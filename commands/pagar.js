const Discord = require('discord.js');
const emoji = require('../emoji.json');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***pagar***")
  .setDescription("Envia dinheiro para outro usuário")
  .addField("Utilização🔨", "r!pagar [@user] [quantidade]")
  .addField("Exemplo", `r!pagar ${message.author} 138`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();
  
  if (!args[0]) return message.channel.send(erro)
  if (!args[1]) return message.channel.send(erro)
  if (!message.mentions.users.first()) return message.channel.send(erro)
  
 let user = message.mentions.users.first();
  
  let money = await db.fetch(`money_${message.author.id}`);
  if (money == null) money = 0;
  
  if (args[1] > money) return message.reply('precisas de mais ' + args[1] - money + ' de dinheiro!')
  
  args[1] = parseInt(args[1])
  
  db.add(`money_${user.id}`, args[1])
  db.subtract(`money_${message.author.id}`, args[1])
  
  
  let embed = new Discord.RichEmbed()
  .setTitle("Transferência de " + message.author.tag + " para " + user.tag)
  .addField("Dinheiro enviado :dollar:", args[1] + "$")
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setColor([77, 204, 134])
  .setTimestamp();
  
  message.channel.send(embed);
  
}