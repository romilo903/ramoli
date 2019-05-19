const Discord = require('discord.js');
const emoji = require('../emoji.json');

exports.run = async (client, message, args) => {
  
  let m = await message.channel.send("Calculando `ping` . . .");
  
  let data_atual = Date.now();
  let heartbeat = (data_atual - message.createdTimestamp);
  let latency = Math.round(m.createdTimestamp - message.createdTimestamp);
  let api_latency = Math.round(client.ping);
  
  let embed = new Discord.RichEmbed()
  .setColor([54, 57, 63])
  .setTitle("🏓Pong!")
  .setAuthor(client.user.username, client.user.avatarURL)
  .addField("HeartBeat" + emoji.heart, heartbeat + "ms", true)
  .addField("Latência" + emoji.antena, latency + "ms", true)
  .addField("Latência da API" + emoji.discord, api_latency + "ms", true)
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp();
  
  m.edit(embed);
}