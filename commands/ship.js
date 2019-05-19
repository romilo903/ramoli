const Discord = require('discord.js');
const emoji = require("../emoji.json");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let user2 = message.mentions.users.first();
  let user = message.mentions.users.array()[1] || message.author;
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***ship***")
  .setDescription("Calcula o ship entre 2 pessoas")
  .addField("Utilização🔨", "r!ship [@user] <@user>")
  .addField("Exemplo", `r!ship <@${message.author.id}> <@${client.user.id}>`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();
  
  if (user2 == null) return message.channel.send(erro)
  
  

  
  let percent = await db.fetch(`${user.username}_${user2.username}_love`);
  let shipname = user.username.slice(0, (user.username.length/2)) + user2.username.slice(user2.username.length/2, user2.username.length);
  let shiptag = user2.discriminator.slice(0, 2) + user.discriminator.slice(2, 4);
  
  if (user.id == user2.id) percent = 100;
  
  if (percent == null) {
    
    let love = Math.round(Math.random() * 100)
   
    db.set(`${user.username}_${user2.username}_love`, love)
    db.set(`${user2.username}_${user.username}_love`, love)
    
    percent = await db.fetch(`${user.username}_${user2.username}_love`);
    
  }
  
  let embed = new Discord.RichEmbed()
  .setAuthor("Ship", "https://cdn.discordapp.com/emojis/528295157968273408.png?v=1")
  .setDescription("Ship: **" + user.tag + "** + **" + user2.tag + "**")
  .addField(":label:Nome do ship", shipname + "#" + shiptag, true)
  .addField(emoji.heart + "Resultado", percent + "%", true)
  .setColor([239, 31, 65])
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp();
  
  message.channel.send(embed)
  
}