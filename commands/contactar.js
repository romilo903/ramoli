const Discord = require('discord.js');
const emoji = require("../emoji.json")

exports.run = (client, message, args) => {
  
  let texto = args.join(' ');
  
  let embed = new Discord.RichEmbed()
  .setColor([109, 255, 179])
  .setTitle("Nova mensagem")
  .setDescription(texto)
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp();
    
    let embed2 = new Discord.RichEmbed()
  .setColor([75, 237, 199])
  .setTitle("Mensagem enviada com sucesso!")
  .setDescription("<@" + message.author.id + ">\nA minha equipa irá ler com atenção e reponder para a sua DM " + emoji.romilo)
  .addField("Contacto", "```" + texto + "```")
  .setFooter("Enviado com sucesso por " + message.author.tag + "!", message.author.avatarURL)
  .setTimestamp();
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***contactar***")
  .setDescription("Envia uma mensagem para a minha equipa")
  .addField("Utilização🔨", "r!contactar [texto]")
  .addField("Exemplo", `r!contactar Gostava de participar da equipe do Ramoli!!`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();
  
  if (texto.length < 1) return message.channel.send(erro);

  

  client.channels.get('549658860223463486').send(embed);
  message.delete().catch(O_o=>{});
  message.channel.send(embed2);
  
}