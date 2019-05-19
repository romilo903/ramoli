const Discord = require('discord.js');
const emoji = require('../emoji.json')

exports.run = (client, message, args) => {
  
  let t = args.join(' ');
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***mcskin***")
  .setDescription("Vê a skin de um jogador de Minecraft Java Edition")
  .addField("Utilização🔨", "r!mcskin [jogador]")
  .addField("Exemplo", `r!mcskin Romilo903`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();

  if (t.length < 1) return message.channel.send(erro);

  let embed = new Discord.RichEmbed()
  .setColor([119, 0, 255])
  .setTitle("Skin de " + args[0])
  .setAuthor(args[0], "https://cravatar.eu/helmhead/" + args[0] + "/600.png")
  .setDescription("Baixe [aqui](https://minotar.net/download/" + args[0] + ")")
  .setImage("https://minotar.net/skin/" + args[0])
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp();

  message.channel.send(embed);

}
