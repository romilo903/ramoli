const Discord = require('discord.js');
const emoji = require('../emoji.json');

exports.run = (client, message, args) => {

  let say = args.join(' ');
  message.delete().catch(O_o=>{});
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***say***")
  .setDescription("Faz-me dizer algo no chat")
  .addField("Utilização🔨", "r!say [mensagem]")
  .addField("Exemplo", `r!say Olá!`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();

  if (say.length < 1) return message.channel.send(erro);
  
  message.channel.send(say);
  
}