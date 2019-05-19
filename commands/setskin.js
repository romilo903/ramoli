const Discord = require('discord.js');
const emoji = require("../emoji.json");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***setskin***")
  .setDescription("Define a skin para o comando **perfil**\nTem de ser um jogador de minecraft Java Edition Original!!!")
  .addField("Utilização🔨", "r!setskin [jogador]")
  .addField("Exemplo", `r!setskin Romilo903`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();
  
 if (!args[0]) return message.channel.send(erro)
  
  db.set(`${message.author.id}_mcskin`, args[0])
  
  let embed = new Discord.RichEmbed()
  .setTitle("Skin definida!")
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp()
  .setDescription("A skin do `" + client.prefix + "perfil` foi alterada para **`" + args[0] + "`**!!")
  .setThumbnail("https://minotar.net/helm/" + args[0] + "/100.png")
  
  message.channel.send(embed)
  
}