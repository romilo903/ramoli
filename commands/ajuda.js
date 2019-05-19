const Discord = require("discord.js");
const emoji = require('../emoji.json')

exports.run = async (client, message, args) => {
  
var embedA = new Discord.RichEmbed() 
.setDescription('Enviei todos os comandos para a sua DM!')
.setColor([242, 127, 46])
.setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
.setTimestamp()
    

    message.delete().catch(O_o=>{});
    let ms = await message.channel.send(embedA)

var embedB = new Discord.RichEmbed()
.setColor([244, 179, 66])
.setTitle('Os meus comandos')
.setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`\n\n\n**⏪Volta para este menu**\n" + emoji.vazio)
.addField("🛠 Administração", "`anunciar`, `ban`, `unban`...")
.addField("🕹 Diversão", "`ajuda`, `say`, `rank`...")
.addField("💬 Social", "`rank`, `perfil`, `xptop`")
.addField("🚀 Envios", "`sugestao`, `bug`, `parceria`")
.addField(emoji.minecraft + " Minecraft", "`mcavatar`, `mcbody`, `mcskin`...")
.addField("💸 Economia", "`dinheiro`, `pagar`, `minerar`...")
.addField("📎 Uteis", "`Nada mesmo...`")
.addField(emoji.gear + " Configurações", "`config`, `setskin`")
.addField("👁‍🗨 Informações", "`botinfo`, `staff`, `serverinfo`...")
.setTimestamp()
.setFooter(message.client.user.username, message.client.user.avatarURL)

if (message.guild.id == "534638912161841173") embedB.addField(emoji.ramoli + "Servidor de Suporte", "`Comandos exclusivos do meu servidor de suporte!!`")

let c = await message.author.send(message.author, { embed: embedB }).catch(async e => {
  ms.delete()
   message.channel.send(message.author, { embed: embedB })
})
    
  

        let administradorfilter = (r, u) => r.emoji.name === '🛠' && u.id == message.author.id;
        let administrador = c.createReactionCollector(administradorfilter, { time: 120000});
  
        let diversãofilter = (r, u) => r.emoji.name === '🕹' && u.id == message.author.id;
        let diversão = c.createReactionCollector(diversãofilter, { time: 120000});
  
        let voltarfilter = (r, u) => r.emoji.name === '⏪' && u.id == message.author.id;
        let voltar = c.createReactionCollector(voltarfilter, { time: 120000});
  
        let mimfilter = (r, u) => r.emoji.name === '🚀' && u.id == message.author.id;
        let mim = c.createReactionCollector(mimfilter, { time: 120000});
  
        let minefilter = (r, u) => r.emoji.id === '559107417846185984' && u.id == message.author.id;
        let mine = c.createReactionCollector(minefilter, { time: 120000});
  
        let moneyfilter = (r, u) => r.emoji.name === '💸' && u.id == message.author.id;
        let money = c.createReactionCollector(moneyfilter, { time: 120000});

        let configfilter = (r, u) => r.emoji.id === '531089285588189194' && u.id == message.author.id;
        let config = c.createReactionCollector(configfilter, { time: 120000});
  
        let infofilter = (r, u) => r.emoji.name === '👁‍🗨' && u.id == message.author.id;
        let info = c.createReactionCollector(infofilter, { time: 120000});
  
        let socialfilter = (r, u) => r.emoji.name === '💬' && u.id == message.author.id;
        let social = c.createReactionCollector(socialfilter, { time: 120000});
  
        let utilfilter = (r, u) => r.emoji.name === '📎' && u.id == message.author.id;
        let util = c.createReactionCollector(utilfilter, { time: 120000});
  
        let ifilter = (r, u) => r.emoji.id === '545898691236724756' && u.id == message.author.id && message.guild.id == "534638912161841173";
        let i = c.createReactionCollector(ifilter, { time: 120000});

  
        administrador.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle('🛠Administração🛠')
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .addField("anunciar [anúncio]", "Envia um anúncio no chat atual")
            .addField("ban [@user] <motivo>", "Banir um membro **(em breve)**")
            .addField("unban [user ID]", "Retirar o banimento de um membro **(em breve)**")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });
  info.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle('👁‍🗨Info👁‍🗨')
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .addField("botinfo", "Vê algumas informações sobre mim")
            .addField("serverinfo", "Vê informações do servidor atual")
            .addField("clima [local]", "Vê a temperatura de um local do mundo")
            .addField("adicionar", "Mostra um link para me adicionar a um servidor")
            .addField("vote", "Mostra um link para votar em mim")
            .addField("suporte", "Mostra um link para o meu servidor de suporte")
            .addField("website", "Mostra um link para o meu site")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });
  diversão.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle('🕹Diversão🕹')
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .addField("ajuda", "Abre este menu")
            .addField("say [mensagem]", "Faz com que eu envie uma mensagem personalizada")
            .addField("avatar <@user>", "Veja o avatar de um utilizador")
            .addField("ping", "Veja o ping. Util para testar se o bot está a funcionar")
            .addField("moeda", "Lança uma moeda e vê se calha **cara** ou **coroa**")
            .addField("ship [@user] <@user>", "Calcula o ship entre 2 pessoas")
            .addField("enigma", "Se gostas de enigmas recomendo usares este comando")
            .addField('batalha [@user]', "Batlha com outra pessoa. Quem vai vencer?")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });
    mim.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle('🚀Envios🚀')
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .addField("sugestao [sugestão]", "Envia uma sugestão para a minha equipa")
            .addField("contactar [argumentos]", "Envia uma mensagem para a minha equipa")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });
  mine.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle(emoji.minecraft + 'Minecraft' + emoji.minecraft)
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .addField("mcavatar [usuário minecraft]", "Vê o avatar da skin de um jogador de Minecraft __Java__ __Edition__")
            .addField("mcbody [usuário minecraft]", "Vê o corpo da skin de um jogador de Minecraft __Java__ __Edition__")
            .addField("mcskin [usuário minecraft]", "Vê a **skin** de um jogador de Minecraft __Java__ __Edition__")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });
  money.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle('💸Economia💸')
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .addField("dinheiro <@user>", "Vê o dinheiro de um usuário")
            .addField("pagar [@user] [dinheiro]", "Envia dinheiro a um usuário")
            .addField("daily", "Recolhe o seu dinheiro diário")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });
  
  social.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle('💬Social💬')
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .addField("rank <@user>", "Serve para ver o nível e o XP")
            .addField("perfil <@user>", "Mostra o perfil de um utilizador")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });

        config.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle(emoji.gear + 'Configurações' + emoji.gear)
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .addField("config", "Configura o bot no servidor")
            .addField("setskin [jogador]", "Define a skin para o comando **perfil**\nTem de ser um jogador de minecraft Java Edition Original!!!")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });
  
        util.on('collect', async _ => {
            var a = new Discord.RichEmbed()
            .setTitle('📎Uteis📎')
            .setDescription("`[]` - **Obrigatório**\n`<>` - **Opcional**\n\nPrefixo no servidor: `" + client.prefix + "`")
            .setTimestamp()
            .setColor([244, 179, 66])
            .setFooter(message.client.user.username, message.client.user.avatarURL)
            c.edit(message.author, { embed: a })
        });
        
    voltar.on('collect', async _ => {
            c.edit(message.author, { embed: embedB })
        });
  
  await c.react('🛠')
  await c.react('🕹')
  await c.react('💬')
  await c.react('🚀')
  await c.react('559107417846185984')
  await c.react('💸')
  await c.react('📎')
  await c.react('531089285588189194')
  await c.react('👁‍🗨')
  await c.react('⏪')
  
    

}