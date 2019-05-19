const Discord = require('discord.js');
const emoji = require('../emoji.json');

exports.run = (client, message, args) => {
  
  let t = args.join(' ');
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***mcbody***")
  .setDescription("Vê o corpo de uma skin de um jogador de Minecraft Java Edition")
  .addField("Utilização🔨", "r!mcbody [jogador]")
  .addField("Exemplo", `r!mcbody Romilo903`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();

  if (t.length < 1) return message.channel.send(erro);

  let embed = new Discord.RichEmbed()
  .setColor([119, 0, 255])
  .setTitle("Corpo de " + args[0])
  .setAuthor(args[0], "https://cravatar.eu/helmhead/" + args[0] + "/600.png")
  .setDescription("Baixe [aqui](https://minotar.net/armor/body/" + args[0] + "/100.png)")
  .setImage("https://minotar.net/armor/body/" + args[0] + "/100.png")
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp();

  message.channel.send(embed);

}
