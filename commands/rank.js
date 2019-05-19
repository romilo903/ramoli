const Discord = require('discord.js');
const Canvas = require('canvas');
const snekfetch = require('node-superfetch');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || message.author;

  if (user.bot) return message.channel.send("<@" + message.author.id + ">\nOs BOT's não recebem **XP**!\n<@" + user.id + "> é um BOT!!!:robot:")

 message.channel.startTyping();

  let xp = await db.fetch(`xp_${message.guild.id}_${user.id}`);
  let level = await db.fetch(`level_${message.guild.id}_${user.id}`);
  
  if (xp == null) xp = 0;
  if (level == null) level = 0;
  
  let nextlevel = (level + 1) * 100


  let percent = Math.floor(xp / nextlevel * 100);
  let nquad = Math.floor(percent / 4);
  let quads = "";
  
  if (nquad == 1) quads = "█";
  if (nquad == 2) quads = "██";
  if (nquad == 3) quads = "███";
  if (nquad == 4) quads = "████";
  if (nquad == 5) quads = "█████";
  if (nquad == 6) quads = "██████";
  if (nquad == 7) quads = "███████";
  if (nquad == 8) quads = "████████";
  if (nquad == 9) quads = "█████████";
  if (nquad == 10) quads = "██████████";
  if (nquad == 11) quads = "███████████";
  if (nquad == 12) quads = "████████████";
  if (nquad == 13) quads = "█████████████";
  if (nquad == 14) quads = "██████████████";
  if (nquad == 15) quads = "███████████████";
  if (nquad == 16) quads = "████████████████";
  if (nquad == 17) quads = "█████████████████";
  if (nquad == 18) quads = "██████████████████";
  if (nquad == 19) quads = "███████████████████";
  if (nquad == 20) quads = "████████████████████";
  if (nquad == 21) quads = "█████████████████████";
  if (nquad == 22) quads = "██████████████████████";
  if (nquad == 23) quads = "███████████████████████";
  if (nquad == 24) quads = "████████████████████████";
  if (nquad == 25) quads = "█████████████████████████";
  if (nquad == 0) {
   if (xp >= 1) quads = "▏" 
  }
  
  const canvas = Canvas.createCanvas(359, 105);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = "rgb(232, 123, 0)";
  ctx.fillRect(0, 0, 359, 250);

  ctx.fillStyle = "rgb(255, 167, 67)";
  ctx.fillRect(4, 3, 350, 98);
  
  const { body: a } = await snekfetch.get(user.avatarURL);
  const avatar = await Canvas.loadImage(a);
  ctx.drawImage(avatar, 7, 6, 82, 82);

  ctx.font = "18px Arial";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(`${user.username}`, 7, 102);
  
  ctx.font = "25px Arial";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText(`Nível: ${level}`, 100, 27);

  ctx.fillStyle = "rgb(0, 110, 255)";
  ctx.fillRect(93, 38, 241, 36);

  ctx.font = "13px Arial";
  ctx.fillStyle = "rgb(0, 208, 255)";
  ctx.fillText(quads, 98, 55);

  ctx.font = "13px Arial";
  ctx.fillStyle = "rgb(0, 208, 255)";
  ctx.fillText(quads, 98, 65);

  ctx.font = "25px Arial";
  ctx.fillStyle = "rgb(255, 255, 255)";
  ctx.fillText("XP: " + xp + "/" + nextlevel + " (" + percent + "%)", 100, 96)

  
  
  const attach = new Discord.Attachment(canvas.toBuffer(), `rank.png`);
  
  setTimeout(() => {
    message.channel.stopTyping(true);
    message.channel.send(attach);
  }, 1000 * 1);
  
}