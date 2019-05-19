const Discord = require('discord.js');
const emoji = require('../emoji.json');
const db = require('quick.db');
const utils = require("../utils.js")

  exports.run = async (client, message, args) => {
    
  let staff = await utils.staff(message.author.id)
  
  if (staff == false) return message.channel.send("Não tens permisão para usar este comando!")
    
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      
      
      let embed = new Discord.RichEmbed()
      .setTitle("Eval executado com sucesso!")
      .addField(":inbox_tray: Entrada", "```js\n" + code + "\n```")
      .addField(":outbox_tray: Saida", "```js\n" + clean(evaled) + "\n```")
      .setColor([0, 229, 45])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
 
      message.channel.send(embed);
    } catch (err) {
      let embederr = new Discord.RichEmbed()
      .setTitle("Eval executado com um erro!")
      .addField(":inbox_tray: Entrada", "```js\n" + args.join(" ") + "\n```")
      .addField(":outbox_tray: Saida", "```js\n" + clean(err) + "\n```")
      .setColor([229, 0, 0])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
      message.channel.send(embederr); 
    }
    
    function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  
  }