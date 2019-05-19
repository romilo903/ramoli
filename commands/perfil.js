const Discord = require('discord.js');
const emoji = require("../emoji.json");
const db = require('quick.db');
const Canvas = require('canvas');
const snekfetch = require('node-superfetch');

exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || message.author
  
  let mineuser = await db.fetch(`${user.id}_mcskin`)
  if (!mineuser) mineuser = "MHF_Steve"
  
  const canvas = Canvas.createCanvas(846, 805);
  const ctx = canvas.getContext('2d');
  
  const { body: a } = await snekfetch.get('https://cdn.glitch.com/05a64fb1-e7de-4f71-b25f-a95bcf8c0d4f%2FPicsArt_01-03-08.11.11.png?1549397606515');
  const avatar = await Canvas.loadImage(a);
  ctx.drawImage(avatar, 0, 0, 846, 805);
  
  const { body: b } = await snekfetch.get('https://minotar.net/armor/body/' + mineuser);
  const skin = await Canvas.loadImage(b);
  ctx.drawImage(skin, 155, 45, 160, 315);
  
  const attach = new Discord.Attachment(canvas.toBuffer(), `${user.username}-Perfil.png`);
  
  if (mineuser == "MHF_Steve") {
    let m = await message.channel.send('Usa `' + client.prefix + 'setskin [jogardor]` para definires uma skin para o teu perfil! **Nota:** o jogador tem de ter uma conta original de __Minecraft__ __Java__ __Edition__!!')
    
    m.delete(25000)
    
  }
  
  message.channel.send(user.tag, attach)
  
}