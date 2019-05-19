const Discord = require('discord.js');
const db = require('quick.db');
const parse = require('parse-ms')
const emoji = require('../emoji.json');

exports.run = async (client, message, args) => {
  
  let valor = 8.64e+7;
  
  let daily = await db.fetch(`lastdaily_${message.author.id}`);
  
  if (daily !== null && valor - (Date.now() - daily) > 0) { 
     let vlr = parse(valor - (Date.now() - daily)); 
let embed1 = new Discord.RichEmbed()
  .setTitle("Já recebeste o daily!")
  .setAuthor(message.author.tag, message.author.avatarURL)
  .addField("Póximo `daily`" + emoji.rico2, "Daqui a **" + vlr.hours + "** horas, **" + vlr.minutes + "** minutos e **" + vlr.seconds + "** segundos")
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setColor([255, 95, 63])
  .setTimestamp();
    message.channel.send(embed1)
}else {
let random = Math.floor(Math.random() * 199) + 1;
  
  db.add(`money_${message.author.id}`, random);
  
  db.set(`lastdaily_${message.author.id}`, Date.now())
  
  let embed2 = new Discord.RichEmbed()
  .setTitle("Recebeste o daily")
  .setDescription(message.author.username + ", volta em 24 horas para ganhares outro daily")
  .addField("Dinheiro ganho" + emoji.rico, random + "$")
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setColor([58, 209, 103])
  .setTimestamp();
  
  message.channel.send(embed2);
}
  
  
  
  
  
  
  
}