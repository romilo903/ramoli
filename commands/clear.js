const Discord = require('discord.js');
const emoji = require('../emoji.json');

exports.run = async (client, message, args) => {
  var clear = args[0];
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***clear***")
  .setDescription("Apaga mensagens de um canal")
  .addField("Utilização🔨", "r!clear [número de mensagens (1-100)]")
  .addField("Exemplo", `r!clear 3`)
  .addField("Tu nececitas de permissão para gerenciar mensagens!!!\nEu nececito de permissão de gerenciar mensagens!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();

  if (!clear) return message.channel.send(erro);
  
  clear = parseInt(args[0]);
  
  if (clear > 100) message.channel.send("Só consigo apagar entre **`1 e 100`** mensagens!")
  
  const fetchedb = await message.channel.fetchMessages({limit: 1});
      message.channel.bulkDelete(fetchedb)
  
  
  const fetched = await message.channel.fetchMessages({limit: clear});
      message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`Não consegui apagar **${clear}** mensagens`).then(message=>{
    message.delete(3700);
    }));
  
  let apagado = new Discord.RichEmbed()
  .setColor([66, 244, 244])
  .setTitle("Mensagens Apagadas!")
  .addField("Mensagens", clear + emoji.tnt, true)
  .addField("Utilizador", "<@" + message.author.id + ">", true)
  .setFooter("Esta mensagem será auto-destruida", "https://cdn.instructables.com/F81/S6WT/JD0KECLF/F81S6WTJD0KECLF.LARGE.jpg")
  message.channel.send(apagado).then(message=>{
    message.delete(4000);
    })

}