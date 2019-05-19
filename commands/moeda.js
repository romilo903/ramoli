const Discord = require('discord.js');
const emoji = require('../emoji.json');

exports.run = async (client, message, args) => {
 
  var random = Math.floor(Math.random() * 2)
  
  if (random == 0) {
   var mr = "CARA"; 
  }
  
  if (random == 1) {
   var mr = "COROA"; 
  }
  
  
  
  let lançando = new Discord.RichEmbed()
  .setColor([226, 69, 45])
  .setTitle("Lançando a Moeda")
  .setImage("https://gifimage.net/wp-content/uploads/2017/10/coin-flip-gif-10.gif")
  .setTimestamp();
  
  let resultado = new Discord.RichEmbed()
  .setColor([226, 69, 45])
  .setTitle("Moeda Lançada!!!")
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(emoji.coin + "🤔", "»**" + mr + "**«")
  .setImage("https://gifimage.net/wp-content/uploads/2017/10/coin-flip-gif-10.gif")
  .setTimestamp();
  
  const m = await message.channel.send(lançando);
  
  setTimeout(() => {
      m.edit(resultado);
    }, 1000 * 1);
  
}