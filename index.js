const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const db = require('quick.db');
const Canvas = require('canvas');
const snekfetch = require('node-superfetch');
const cooldown = require("./cooldown");
const moment = require('moment');
const client = new Discord.Client();
const emoji = require('./emoji.json');
const utils = require("./utils.js");


client.on("ready", async () => {
 console.log("Bot iniciado");
  console.log("Estou em " + client.guilds.size + " servidores!\n" + client.user.tag + ", " + client.user.id);
  client.user.setStatus("idle")
  client.user.setActivity("você mesmo 👀", {type: "WATCHING"})
  
  setInterval( async () => {
      let random = Math.floor(Math.random() * 9);
    
    
    client.user.setStatus("idle")
    
    if (random == 0) client.user.setActivity("Fui criado por Romilo903#9515", {type: "LISTENING"})
    if (random == 1) client.user.setActivity("Vote em mim!! bit.ly/ramoliup", {type: "STREAMING", url: "https://twitch.tv/romilo903"})
    if (random == 2) client.user.setActivity("Meu site oficial => ramoli.tk", {type: "STREAMING", url: "https://twitch.tv/romilo903"})
    if (random == 3) client.user.setActivity(client.guilds.size + " servidores", {type: "WATCHING"})
    if (random == 4) client.user.setActivity("discord.gg/yP5ztZ2 <= Meu servidor de Suporte", {type: "STREAMING", url: "twitch.tv/romilo903"})
    if (random == 5) client.user.setActivity("O meu prefixo padrão é [r!], mas pode ser alterado com o comando {config}!!")
    if (random == 6) client.user.setActivity("🐣Bom DIA!!!")
    if (random == 7) client.user.setActivity("🙂😜😻🙈😎😆😘", {type: "LISTENING"})
    if (random == 8) client.user.setActivity("UM OI PARA TODO O MUNDO!", {type: "STREAMING", url: "https://twitch.tv/monstercat"})
    
    }, 1000 * 120);

  
})

client.on("message", async message =>{

  if (message.channel.type === 'dm') return undefined;
  let msg = message.content.toLowerCase();
  if (message.author.bot) return undefined;
  
  client.prefix = await db.fetch(`${message.guild.id}_prefix`);
  if (client.prefix == null) client.prefix = "r!";


  if (!cooldown.is(message.author.id)) {
    cooldown.add(message.author.id);
    var add = Math.floor(Math.random() * 9) + 1;
    
    db.add(`xp_${message.guild.id}_${message.author.id}`, add)
    
    setTimeout(() => {
      cooldown.remove(message.author.id);
    }, 1000 * 60);

}
  
  let level = await db.fetch(`level_${message.guild.id}_${message.author.id}`);
  let xp = await db.fetch(`xp_${message.guild.id}_${message.author.id}`);
  
  if (xp >= (level + 1) * 100) {
    
    db.add(`level_${message.guild.id}_${message.author.id}`, 1);
    db.subtract(`xp_${message.guild.id}_${message.author.id}`, (level + 1) * 100)
    
    level = await db.fetch(`level_${message.guild.id}_${message.author.id}`);

    let embed = new Discord.RichEmbed()
  .setColor([225, 255, 94])
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setTitle("Level UP!")
  .setDescription("<@" + message.author.id + "> subiu para o nível " + level + "! :tada:")
  .setTimestamp();
    
    let canal = await db.fetch(`${message.guild.id}_levelup`)
    
    if (!canal) message.channel.send(embed)
    else if (canal == "dm") message.author.send("Servidor => " + message.guild.name, {embed: embed})
    else message.guild.channels.get(canal).send(embed)
  }


  if (msg.indexOf(client.prefix) !== 0) return undefined;
  const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    delete require.cache[require.resolve(`./commands/${command}.js`)] 
    let commands = require(`./commands/${command}.js`);
    
    if (commands.manu && !utils.staff(message.author.id)) return message.channel.send("🔩 Comando em manutençao!!")
    
    commands.run(client, message, args);
  } catch (e) {
   console.log(e);
    let chjks = await db.fetch(`${message.guild.id}_errocmd`)
    
    if (!chjks) {
    message.channel.send("<@" + message.author.id + ">\nO comando `" + command + "` não existe ou aconteceu um erro ao executar!\nUsa ***__" + client.prefix + "ajuda__*** para obter uma lista de todos os comandos")
    }

  } finally {};




});



client.on("guildMemberAdd", async member => {
  let canal = await db.fetch(`${member.guild.id}_entrada`)
  const canvas = Canvas.createCanvas(359, 220);
  const ctx = canvas.getContext('2d');
  
  const { body: f } = await snekfetch.get("https://cdn.discordapp.com/attachments/522864184682217473/529365891050242063/PicsArt_12-06-11.40.36.png");
  const fundo = await Canvas.loadImage(f);
  ctx.drawImage(fundo, 0, 0, 359, 220);

  const { body: a } = await snekfetch.get(member.user.avatarURL || member.user.def);
  const avatar = await Canvas.loadImage(a);
  ctx.drawImage(avatar, 130, 80, 95, 90);

  ctx.font = "18px Arial";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(`${member.user.username}`, 130, 190);

  let msg = await db.fetch(member.guild.id + "_entrada_msg")
      if (msg == null) msg = "Olá {user}!\nBem-vindo ao servidor **{server}**\nÉ o nosso __{users}º__ membro";
      
      while (msg.includes('{user}')) msg = msg.replace('{user}', member.user);
      while (msg.includes('{nome}')) msg = msg.replace('{nome}', member.user.username);
      while (msg.includes('{tag}')) msg = msg.replace('{tag}', member.user.discriminator);
      while (msg.includes('{server}')) msg = msg.replace('{server}', member.guild.name);
      while (msg.includes('{users}')) msg = msg.replace('{users}', member.guild.memberCount);
  
  const attach = new Discord.Attachment(canvas.toBuffer(), `bem-vindo.png`);
  if (canal == null) return undefined;
  client.channels.get(canal).send(msg, attach);
  
  let autorole = await db.fetch(member.guild.id + "_autorole")
  
  member.addRole(autorole)
  
  });

client.on("guildMemberRemove", async member => {
  let canal = await db.fetch(`${member.guild.id}_entrada`)
  const canvas = Canvas.createCanvas(359, 220);
  const ctx = canvas.getContext('2d');
  
  const { body: f } = await snekfetch.get("https://cdn.discordapp.com/attachments/522864184682217473/529365890291204096/PicsArt_12-06-11.51.45.png");
  const fundo = await Canvas.loadImage(f);
  ctx.drawImage(fundo, 0, 0, 359, 220);

  const { body: a } = await snekfetch.get(member.user.avatarURL);
  const avatar = await Canvas.loadImage(a);
  ctx.drawImage(avatar, 180, 80, 95, 90);

  ctx.font = "bold 18px Arial";
  ctx.fillStyle = "rgb(99, 255, 239)";
  ctx.fillText(`${member.user.username}`, 160, 190);
  
  let msg = await db.fetch(member.guild.id + "_saida_msg")
      if (msg == null) msg = "Adeus {nome}#{tag}!\nEspero que volte um dia ao servidor **{server}**\nFicamos com __{users}__ membros";
      
      while (msg.includes('{user}')) msg = msg.replace('{user}', member.user);
      while (msg.includes('{nome}')) msg = msg.replace('{nome}', member.user.username);
      while (msg.includes('{tag}')) msg = msg.replace('{tag}', member.user.discriminator);
      while (msg.includes('{server}')) msg = msg.replace('{server}', member.guild.name);
      while (msg.includes('{users}')) msg = msg.replace('{users}', member.guild.memberCount);
  
  const attach = new Discord.Attachment(canvas.toBuffer(), `adeus.png`);
  if (canal == null) return undefined;
  client.channels.get(canal).send(msg, attach);
  db.delete(`xp_${member.guild.id}_${member.user.id}`)
  db.delete(`level_${member.guild.id}_${member.user.id}`)
})

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (oldMessage == "") return
  if (newMessage == "") return
  
  if (newMessage == oldMessage) return
  
  let embed = new Discord.RichEmbed()
  .setTitle("Mensagem editada!✏")
  .addField("<:whisper:528295157850701844> Anterior", oldMessage.content)
  .addField(emoji.enchantedbook + " Editada", newMessage.content)
  .addField("📖 Canal", "<#" + oldMessage.channel.id + ">")
  .setColor([211, 106, 237])
  .setFooter(oldMessage.author.tag, oldMessage.author.avatarURL)
  .setTimestamp();
  
  let canal = await db.fetch(`messagelog_${oldMessage.guild.id}`)
  
  if (!canal) return
  
  client.channels.get(canal).send(embed)
})

client.on("messageDelete", async message => {
  if (message == "") return undefined;
   let embed = new Discord.RichEmbed()
  .setTitle("Mensagem apagada!❌")
  .addField("<:whisper:528295157850701844> Mensagem", message.content)
  .addField("📖 Canal", "<#" + message.channel.id + ">")
  .setColor([211, 106, 237])
  .setFooter(message.author.tag, message.author.avatarURL)
  .setTimestamp();
  
  let canal = await db.fetch(`messagelog_${message.guild.id}`)
  
  if (!canal) return
  
  client.channels.get(canal).send(embed)
})

client.on("guildCreate", guild => {
  let embed = new Discord.RichEmbed()
  .setTitle("Fui adicionado a um novo servidor!!")
  .addField("Nome", guild.name)
  .addField("Membros", guild.memberCount)
  .setFooter("Dono: " + guild.owner.user.tag, guild.owner.user.avatarURL)
  .setColor([255, 153, 0])
  .setTimestamp();
  
  client.channels.get('545917841723883540').send(embed)
  
  let embeddm = new Discord.Richembed()
  .setColor([255, 153, 0])
  .setAuthor(client.user.tag, client.user.avatarURL)
  .setTitle("Obrigado por me adicionar ao seu servidor😘")
  .setDescription("Alguém me adicionou ao servidor **" + guild.name + "**\nSe nã sabes quem eu sou, uma pequena apresentação 🎭:\n```Olá! Sou o Ramoli, um bot para o Discord. Fui programado pelo Romilo903#9515, em JavaScript```Para saberes os meus comandos usa **r!ajuda**\nPodes também alterar o meu prefixo!!")
  .addField("O meu WebSite", "https://ramoli.000webhostapp.com/", true)
  .addField("Servidor de Suporte", "https://discord.gg/tFqvtjg", true)
  .setTimestamp();
  
  guild.owner.user.send(embeddm)
})

client.on("guildDelete", guild => {
  let embed = new Discord.RichEmbed()
  .setTitle("Fui removido de um servidor 😢")
  .addField("Nome", guild.name)
  .addField("Membros", guild.memberCount)
  .setFooter("Dono: " + guild.owner.user.tag, guild.owner.user.avatarURL)
  .setColor([255, 153, 0])
  .setTimestamp();
  
  client.channels.get('545917841723883540').send(embed)
})

client.login(process.env.TOKEN)