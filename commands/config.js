const Discord = require('discord.js');
const db = require('quick.db');
const emoji = require('../emoji.json');

exports.run = async (client, message, args) => {
  
    let entrada = await db.fetch(message.guild.id + "_entrada")
    let saida = await db.fetch(message.guild.id + "_saida")
    let levelup = await db.fetch(message.guild.id + "_levelup")
    let autorole = await db.fetch(message.guild.id + "_autorole")
    let messagelog = await db.fetch(`messagelog_${message.guild.id}`)
    let errocmd = await db.fetch(message.guild.id + "_errocmd")
    
    if (saida == null) saida = "DESATIVADO" + emoji.desligado + " || Usa `" + client.prefix + "config saida [#canal]` para ativar"
  else saida = "<#" + saida + ">" + emoji.ligado + " || Usa `" + client.prefix + "config saida off` para desativar"
  
  if (entrada == null) entrada = "DESATIVADO" + emoji.desligado + " || Usa `" + client.prefix + "config entrada [#canal]` para ativar"
  else entrada = "<#" + entrada + ">" + emoji.ligado + " || Usa `" + client.prefix + "config entrada off` para desativar"
  
  if (levelup == null) levelup = "Canal atual"
  else if (levelup == "dm") levelup = "DM"
  else levelup = "<#" + levelup + ">"
  
  if (autorole == null) autorole = "DESATIVADO" + emoji.desligado + " || Usa `" + client.prefix + "config autorole [@cargo]` para ativar"
  else autorole = "<@&" + autorole + ">" + emoji.ligado +  "|| Usa `" + client.prefix + "config autorole off` para desativar" 
  
  if (messagelog == null) messagelog = "DESATIVADO" + emoji.desligado + " || Usa `" + client.prefix + "config messagelog [#canal]` para ativar"
  else messagelog = "<#" + messagelog + ">" + emoji.ligado +  "|| Usa `" + client.prefix + "config messagelog off` para desativar"
  
  if (errocmd == null) errocmd = "ATIVADO" + emoji.ligado + " || Usa `" + client.prefix + "config errocmd off` para desativar"
  else errocmd = "DESATIVADO" + emoji.desligado +  "|| Usa `" + client.prefix + "config errocmd on` para ativar"
    
    let configs = new Discord.RichEmbed()
    .setTitle("Configurações do servidor " + message.guild.name)
    .setThumbnail(message.guild.iconURL)
    .addField("Prefixo `(prefixo)`", client.prefix + " || Usa `" + client.prefix + "config prefixo [prefixo]` para alterar!")
    .addField("Canal de Entrada `(entrada)`", entrada, true)
    .addField("Canal de Saida `(saida)`", saida, true)
    .addField("Mensagem de level up `(levelup)`", levelup + " || Usa `" + client.prefix + "config levelup [atual | dm | #canal]`", true)
    .addField("Cargo Automático `(autorole)`", autorole, true)
    .addField("Log de Mensagens `(messagelog)`", messagelog)
    .addField("Comando inválido `(errocmd)`", errocmd)
    .setColor([54, 57, 63])
    .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
    .setTimestamp();

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        if (message.author.id !== "388468380207677441") return message.channel.send(configs)
    }

    if (args[0] == "entrada") { 
      
      if (args[1] == "off") { 
      
      db.delete(`${message.guild.id}_entrada`)
      
      let embed = new Discord.RichEmbed()
      .setAuthor("Mensagem de saida")
      .setDescription("A mensagem de entrada foi desligada com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL);
      
      message.channel.send(embed)
      
      return
    }
  
    let canal = message.mentions.channels.first()
    
    if (!canal) return message.channel.send("<@" + message.author.id + ">\nUso correto: `" + client.prefix + "config entrada [#canal]`")

      db.set(`${message.guild.id}_entrada`, canal.id);

      let embed =new Discord.RichEmbed()
      .setAuthor("Canal de mensagem de boas vindas")
      .setDescription("O canal de boas-vindas foi configurado para <#" + canal.id + "> com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
      message.channel.send(embed)
    }
  else if(args[0] == "prefixo") {
    if(!args[1]) return message.channel.send("O prefixo deve ter entre **`1`** e **`5`** caracteres");
    if(args[1].length > 5) return message.channel.send("O prefixo deve ter entre **`1`** e **`5`** caracteres");
    
    if (args[1] == "r!") db.delete(`${message.guild.id}_prefix`);
    else db.set(`${message.guild.id}_prefix`, args[1]);
    
    let embed = new Discord.RichEmbed()
      .setAuthor("Prefixo no servidor")
      .setDescription("O prefixo neste servidor foi configurado para `" + args[1] + "` com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
    message.channel.send(embed);
  }
  else if (args[0] == "saida") {
    
    if (args[1] == "off") { 
      
      db.delete(`${message.guild.id}_saida`)
      
      let embed = new Discord.RichEmbed()
      .setAuthor("Mensagem de saida")
      .setDescription("A mensagem de saida foi desligada com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL);
      
      message.channel.send(embed)
      
      return
    }
    
    
    let canal = message.mentions.channels.first()
    
    if (!canal) return message.channel.send("<@" + message.author.id + "\>nUso correto: `" + client.prefix + "config saida [#canal]`")

      db.set(`${message.guild.id}_saida`, canal.id);

      let embed =new Discord.RichEmbed()
      .setAuthor("Canal de mensagem de saida")
      .setDescription("O canal das mensagens de saida foi configurado para <#" + canal.id + "> com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
      message.channel.send(embed)
  }
  else if (args[0] == "levelup") {
    let canal = message.mentions.channels.first()
    
    if (canal) db.set(`${message.guild.id}_levelup`, canal.id)
    else if (args[1] == "dm") db.set(`${message.guild.id}_levelup`, "dm")
    else if (args[1] == "atual") db.delete(`${message.guild.id}_levelup`)
    else return message.channel.send("<@" + message.author.id + ">\nUso correto: `" + client.prefix + "config levelup [atual | dm | #canal]`")
    
    let resp
    
    if (canal) resp = "<#" + canal.id + ">"
    else if (args[1] == "dm") resp = "**DM**"
    else if (args[1] == "atual") resp = "**canal autual**"

      

      let embed = new Discord.RichEmbed()
      .setAuthor("Canal de mensagem de Level Up")
      .setDescription("O canal das mensagens de level up foi configurado para " + resp + " com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
      message.channel.send(embed)
  }
  else if (args[0] == "autorole") {
    
    if (args[1] == "off") { 
      
      db.delete(`${message.guild.id}_autorole`)
      
      let embed = new Discord.RichEmbed()
      .setAuthor("Cargo Automático")
      .setDescription("O cargo automático foi desligado com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL);
      
      message.channel.send(embed)
      
      return
    }
    let cargo = message.mentions.roles.first()
    
    if (!cargo) return message.channel.send("<@" + message.author.id + ">\nUso correto: `" + client.prefix + "config autorole [@cargo]`")

      db.set(`${message.guild.id}_autorole`, cargo.id)

      let embed = new Discord.RichEmbed()
      .setAuthor("Cargo Automático")
      .setDescription("O cargo automático foi configurado para <@&" + cargo.id + "> com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
      message.channel.send(embed)
  }
  else if (args[0] == "messagelog") {
    
    if (args[1] == "off") { 
      
      db.delete(`messagelog_${message.guild.id}`)
      
      let embed = new Discord.RichEmbed()
      .setAuthor("Log de Mensagens")
      .setDescription("O canal do log de mensagens foi desligado com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL);
      
      message.channel.send(embed)
      
      return
    }
    
    let canal = message.mentions.channels.first()
    
    if (!canal) return message.channel.send("<@" + message.author.id + ">\nUso correto: `" + client.prefix + "config messagelog [#canal]`")

      db.set(`messagelog_${message.guild.id}`, canal.id)

      let embed = new Discord.RichEmbed()
      .setAuthor("Log de Mensagens")
      .setDescription("O canal do log de mensagens foi configurado para <#" + canal.id + "> com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
      message.channel.send(embed)
  }
  else if (args[0] == "errocmd") {
    
    if (args[1] == "off") { 
      
      db.set(`${message.guild.id}_errocmd`, "off")
      
      let embed = new Discord.RichEmbed()
      .setAuthor("Mensagem de comando inválido")
      .setDescription("A mensagem de comando inválido foi desligada com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL);
      
      message.channel.send(embed)
      
      return
    }
    
    if (args[1] !== "on") return message.channel.send("<@" + message.author.id + ">\nUso correto: `" + client.prefix + "config errocmd on/off`")

      db.delete(`${message.guild.id}_errocmd`)

      let embed = new Discord.RichEmbed()
      .setAuthor("Mensagem de comando inválido")
      .setDescription("A mensagem de comando inválido foi ligada com sucesso!" + emoji.gear)
      .setColor([54, 57, 63])
      .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
      message.channel.send(embed)
  }
  else {
    message.channel.send(configs)
  }




}