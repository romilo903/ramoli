const Discord = require('discord.js');
const db = require('quick.db');
const emoji = require('../emoji.json')

  exports.run = async (client, message, args) => {
    
    let baus = await db.fetch(`${message.author.id}_chest`)
    if (baus == null) baus = 0
    let bausferro = await db.fetch(`${message.author.id}_ironchest`)
    if (bausferro == null) bausferro = 0
    
    if (args[0] == "abrir") {
      if (args[1] == "normal") {
        if (baus == 0) return message.reply('não tens **nenhum** báu normal!')
        let random = Math.floor(Math.random() * 3) + 1
        
        db.subtract(`${message.author.id}_chest`, 1)
        
        db.add(`${message.author.id}_wood`, 5)
        
        let ganho = "Ganhaste 5 madeiras"
        
        if (random > 1) {
          db.add(`${message.author.id}_iron`, 3)
          ganho += " + 3 ferros"
        }
        
        if (random > 2) {
          db.add(`money_${message.author.id}`, 20)
          ganho += " + 20 de dinheiro"
        }
        
        let embed = new Discord.RichEmbed()
        .setTitle("Baú **Normal** aberto!!")
        .setDescription(message.author + ", acabaste de abrir um baú **Normal**!")
        .addField("Ganhaste", ganho)
        .setColor([154, 201, 60])
        .setTimestamp();
        
        return message.channel.send(embed)
      }
      
      if (args[1] == "ferro") {
        if (bausferro == 0) return message.reply('não tens **nenhum** báu de ferro!')
        let random = Math.floor(Math.random() * 3) + 1
        
        db.subtract(`${message.author.id}_ironchest`, 1)
        
        db.add(`${message.author.id}_wood`, 20)
        
        let ganho = "Ganhaste 20 madeiras"
        
        if (random > 1) {
          db.add(`xp_${message.guild.id}_${message.author.id}`, 27)
          ganho += " + 27 xp"
        }
        
        if (random > 2) {
          db.add(`money_${message.author.id}`, 40)
          ganho += " + 40 de dinheiro"
        }
        
        let embed = new Discord.RichEmbed()
        .setTitle("Baú de **Ferro** aberto!!")
        .setDescription(message.author + ", acabaste de abrir um baú de **Ferro**!")
        .addField("Ganhaste", ganho)
        .setColor([144, 206, 115])
        .setTimestamp();
        
        return message.channel.send(embed)
      }
      
    }
    
    let bausembed = new Discord.RichEmbed()
    .setTitle("Baús")
    .setDescription("Abra baús com `" + client.prefix + "baus abrir [baú]` " + emoji.chest + "\nPara criar baús use `" + client.prefix + "craftingtable`")
    .setColor([206, 111, 28])
    .addField(emoji.bau + " Baús **Normais**", "Tens **`" + baus + "`** baús normais")
    .addField(emoji.bauferro + " Baús de **Ferro**", "Tens **`" + bausferro + "`** baús de ferro")
    .setFooter('Pedido por ' + message.author.tag, message.author.avatarURL)
    .setTimestamp();
    
    message.channel.send(bausembed)
    
  }