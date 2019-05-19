const Discord = require('discord.js');
const emoji = require('../emoji.json');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(erro)
    
    const anuncio = args.join(" ");
    
    message.delete().catch(O_o=>{});
    
    let embed = new Discord.RichEmbed()
    .setColor([255, 255, 0])
    .setTitle(emoji.bell + "Anúncio!!" + emoji.bell)
    .setDescription(anuncio)
    .setFooter("Anunciado por " + message.author.tag, message.author.avatarURL)
    .setTimestamp();
    
    let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***anunciar***")
  .setDescription("Anuncia algo no chat atual")
  .addField("Utilização🔨", "r!anunciar [anúncio]")
  .addField("Exemplo", `r!anunciar Novos cargos no servidor!`)
  .addField("Tu nececitas de permissão administrador!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();

  if (anuncio.length < 1) return message.channel.send(erro);

  let m = await message.channel.send("@everyone", {embed: embed});
  
  m.react('532547532140838922')

  
}