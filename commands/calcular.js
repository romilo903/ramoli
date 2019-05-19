const Discord = require('discord.js')
const math = require('mathjs')

exports.run = (client, message, args) => {
  
  let question = args.join(' ')
  
  if (!question) return message.channel.send('Tens de dizer um calculo')
  
  let resp;
  
  try {
   resp = math.eval(question);
  } catch (err) {
  return message.channel.send("Inválido!")
  }
  
  let embed = new Discord.RichEmbed()
  .setTitle('Calculadora')
  .setDescription('Resposta calculada com sucesso!')
  .addField('Conta', "```" + question + "```", true)
  .addField('Resposta', "```" + resp + "```", true)
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setColor([188, 75, 126])
  .setThumbnail('https://cdn.glitch.com/05a64fb1-e7de-4f71-b25f-a95bcf8c0d4f%2Fcalculator-outline-filled.png?1549106577352')
  .setTimestamp();
  
  message.channel.send(embed)
  
}