const Discord = require('discord.js'); 
const emoji = require("../emoji.json")

  exports.run = async (client, message, args) => {
    let sugestao = args.join(' ');
    
    let embed = new Discord.RichEmbed()
  .setColor([109, 255, 179])
  .setTitle("Sugestão")
  .setDescription(sugestao)
  .setFooter("Enviado por " + message.author.tag, message.author.avatarURL)
  .setTimestamp();
    
    let embed2 = new Discord.RichEmbed()
  .setColor([75, 237, 199])
  .setTitle("Obrigado😜")
  .setDescription("<@" + message.author.id + ">\n Obrigado pela sugestão!!!\nA minha equipa irá ler com atenção e reponder para a sua DM" + emoji.romilo)
  .addField("Sugestão", "```" + sugestao + "```")
  .setFooter("Sugestão enviada com sucesso por " + message.author.tag + "!", message.author.avatarURL)
  .setTimestamp();
    
    let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***sugestao***")
  .setDescription("Envia uma sugestão para a minha equipa")
  .addField("Utilização🔨", "r!sugestao [sugestão]")
  .addField("Exemplo", `r!sugestao Adicionem um comando de enviar FanArt`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();

  if (sugestao.length < 1) return message.channel.send(erro);
    
    let m = await client.channels.get('534730455816077322').send(embed);
    await m.react('534119108653088789');
    await m.react('534119105410629647');
    message.delete().catch(O_o=>{});
    message.channel.send(embed2);
  }