const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  if (!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send("Não tenho permissão para criar um WebHook :frowning2:")
  
  let embed = new Discord.RichEmbed()
  .setDescription(message.author + ", gostas de Enigmas?")
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setColor([0, 76, 255])
  .setTimestamp();
  
  let perg = await message.channel.send(embed)
  
  let simfilter = (r, u) => r.emoji.id === '545897583671902208' && u.id == message.author.id;
  let sim = perg.createReactionCollector(simfilter, { time: 120000});
  
  let naofilter = (r, u) => r.emoji.id === '545900409672433669' && u.id == message.author.id;
  let nao = perg.createReactionCollector(naofilter, { time: 120000});
  
  await perg.react('545897583671902208')
  await perg.react('545900409672433669')
  
  sim.on("collect", async _ => {
    
    perg.delete()
    
    await message.react("😁")
    
    await message.channel.send("Apresento-te o meu amigo, o **Enigmlo**!")
    
    let embed = new Discord.RichEmbed()
        .setTitle("Enigmlo")
        .setDescription("Olá! Eu sou o **Enigmlo**, um bot de enigmas. Clica [aqui](https://enigmlo.000webhostapp.com/download) para começares esta aventura!!")
        .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
        .setColor([0, 8, 255])
        .setTimestamp();
    
      message.channel.createWebhook("Enigmlo", "https://cdn.discordapp.com/avatars/548977140654145559/13337151d25afb960f10d56fff2b97bf.png?size=2048").then(async hook => {
        
        await hook.send(embed)
        
        hook.delete()
      
  })
  })
  
  nao.on("collect", async _ => {
    
    perg.delete()
    
    await message.react("😕")
    
    message.channel.send("Que pena...")
    
  })
  
}