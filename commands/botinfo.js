const Discord = require('discord.js');
const versao = require("../package.json");
const emoji = require("../emoji.json");
const ls = require("ls");

exports.run = (client, message, args) => {

  let string = '';

  client.guilds.forEach(guild => {
    string += "**__`" + guild.name + "`__**\n\n"
  })
  
  let all_files = ls('commands/*').length
  
  let { version } = require('discord.js')

  let embed = new Discord.RichEmbed()
  .setColor([244, 173, 66])
  .setTitle("Informações do " + client.user.username + emoji.CatBot)
  .addField("Criador", emoji.dono + "Romilo903#9515", true)
  .addField("Nacionalidade", ":flag_pt:Português", true)
  .addField("Servidores", ":slot_machine: " + client.guilds.size, true)
  .addField("Membros", ":family_mwgb: " + client.users.size, true)
  .addField("Canais", ":keyboard: " + client.channels.size, true)
  .addField("Prefixo neste servidor", emoji.gear + " **`" + client.prefix + "`**", true)
  .addField("Versão", ":paperclip: *" + versao.version + "*", true)
  .addField("Data de Nascimento", ":baby_bottle: ***29/11/2018***", true)
  .addField("Linguagem", emoji.js + "JavaScript (Node)", true)
  .addField("Biblioteca", emoji.discordjs + "*`discord.js`*, v**" + version + "**", true)
  .addField("Comandos", all_files, true)
  .addField("Menções Honrosas", emoji.romilo + " `Romilo903#9515` - Foi ele que me criou\n`" + message.author.tag + "` - Por estar a usar os meus comandos", true)
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp();

  message.channel.send(embed);
}
