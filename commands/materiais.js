const Discord = require('discord.js');
const emoji = require('../emoji.json');
const db = require('quick.db');

  exports.run = async (client, message, args) => {
    
    let user = message.mentions.users.first() || message.author
    
    if (user.bot) return message.channel.send("Os bots não têm materiais. " + user + " não tem nenhum material porque é um bot :robot:")
    
    let madeira = await db.fetch(`${user.id}_wood`);
  if (madeira == null) madeira = 0;
  
  let ferro = await db.fetch(`${user.id}_iron`);
  if (ferro == null) ferro = 0;
  
  let diamante = await db.fetch(`${user.id}_diamond`);
  if (diamante == null) diamante = 0;
    
    let diamantebau = await db.fetch(`${user.id}_diamondchest`);
  if (diamantebau == null) diamantebau = 0;
    
    let baus = await db.fetch(`${user.id}_chest`)
    if (baus == null) baus = 0
    
    let bausferro = await db.fetch(`${user.id}_ironchest`)
    if (bausferro == null) bausferro = 0
    
    let baumagico = await db.fetch(`${user.id}_magicchest`)  
    if (baumagico == null) baumagico = 0;
    
  let embed = new Discord.RichEmbed()
  .setAuthor("Materiais de " + user.username, user.avatarURL)
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp()
  .setColor([76, 103, 239])
  .addField("Madeira" + emoji.madeira, madeira, true)
  .addField("Ferro" + emoji.ferro, ferro, true)
  .addField("Diamante" + emoji.diamante, diamante, true)
  .addField("Baús Normais" + emoji.bau, baus, true)
  .addField("Baús de Ferro" + emoji.bauferro, bausferro, true)
  .addField("Baús de Diamante" + emoji.baudiamante, diamantebau, true)
  .addField("Baús Mágicos" + emoji.baumagico, baumagico)
  
  message.channel.send(embed)
    
  }