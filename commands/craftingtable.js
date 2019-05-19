const Discord = require('discord.js');
const db = require('quick.db');
const emoji = require('../emoji.json');

exports.run = async (client, message, args) => {
  
  let prefix = client.prefix
  
  let madeira = await db.fetch(`${message.author.id}_wood`);
  if (madeira == null) madeira = 0;
  
  let baus = await db.fetch(`${message.author.id}_chest`)
    if (baus == null) baus = 0
  
  let ferro = await db.fetch(`${message.author.id}_iron`);
  if (ferro == null) ferro = 0;
  
  
  let diamante = await db.fetch(`${message.author.id}_diamond`);
  if (diamante == null) diamante = 0;
  
  let diamantebau = await db.fetch(`${message.author.id}_diamondchest`);
  if (diamantebau == null) diamantebau = 0;
  
  let table = new Discord.RichEmbed()
  .setTitle("  Crafting Table  |  Mesa de Trabalho  ")
  .setDescription("Use as reações para criar itens!" + emoji.craftingtable)
  .addField(emoji.bau + " Baú **Normal**", "Usa `" + prefix + "baus` para abrires esta baus e ganhar itens e dinheiro")
  .addField(emoji.bauferro + " Baú de **Ferro**", "Usa `" + prefix + "baus` para abrires esta baus e ganhar itens e dinheiro")
  .addField(emoji.baudiamante + " Baú de **Diamante**", "Usa `" + prefix + "baus` para abrires esta baus e ganhar itens e dinheiro")
  .setImage("https://cdn.glitch.com/05a64fb1-e7de-4f71-b25f-a95bcf8c0d4f%2FCrafting3x3.png?1547065203318")
  .setColor([150, 85, 45])
  .setTimestamp();
  
  let embed = new Discord.RichEmbed()
  .setTitle("  Crafting Table  |  Mesa de Trabalho  ")
  .setDescription("Vê as tuas mensagens diretas!" + emoji.craftingtable)
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setColor([150, 85, 45])
  .setTimestamp();
  
  let ct = await message.author.send(table)
  .catch((e) => {
    return message.channel.send(":cry: Não consigo enviar mensagens para a sua DM")
  })
  
  let m = await message.channel.send(embed);
  
  m.react('547464935727300635');
  await ct.react('547465154569175050');
  await ct.react('547466680448843777');
  await ct.react('548250435673391115');
  
  let baufilter = (r, u) => r.emoji.id === '547465154569175050' && u.id == message.author.id;
  let bau = ct.createReactionCollector(baufilter, { time: 120000});
  
  let bauironfilter = (r, u) => r.emoji.id === '547466680448843777' && u.id == message.author.id;
  let bauiron = ct.createReactionCollector(bauironfilter, { time: 120000});
  
  let baudiamantefilter = (r, u) => r.emoji.id === '548250435673391115' && u.id == message.author.id;
  let baudiamante = ct.createReactionCollector(baudiamantefilter, { time: 120000});
  
  bau.on('collect', async _ => {
    
    ct.delete().catch(O_o=>{});
    
    let embed2 = new Discord.RichEmbed()
    .setTitle('  Crafting Table  |  Mesa de Trabalho  ')
    .setDescription("Tens a certeza que queres criar este item?" + emoji.simnao)
    .addField("Craft", emoji.madeira + emoji.madeira + emoji.madeira + "\n" + emoji.madeira + emoji.vazio + emoji.madeira + "\n" + emoji.madeira + emoji.madeira + emoji.madeira)
    .setColor([150, 85, 45])
    .setTimestamp();

         let mess = await message.author.send(embed2);
      await mess.react("545897583671902208");
      await mess.react("545900409672433669");
    
    let simfilter = (r, u) => r.emoji.id === '545897583671902208' && u.id == message.author.id;
  let sim = mess.createReactionCollector(simfilter, { time: 120000});
    let naofilter = (r, u) => r.emoji.id === '545900409672433669' && u.id == message.author.id;
  let nao = mess.createReactionCollector(naofilter, { time: 120000});
    
    sim.on('collect', _ => {
      
      mess.delete().catch(O_o=>{});
      
      if (madeira < 8) return message.author.send("Não tens madeira suficiente..." + emoji.madeira)
      
      
      message.author.send("Báu criado com sucesso!" + emoji.sim);
      db.subtract(`${message.author.id}_wood`, 8)
      db.add(`${message.author.id}_chest`, 1)
      
    })
    nao.on('collect', _ => {
      
      mess.delete().catch(O_o=>{});
      message.author.send("Criação cancelada!" + emoji.nao);
      
    })
           
           });
  
  
  
  bauiron.on('collect', async _ => {
    
    ct.delete().catch(O_o=>{});
    
    let embed2 = new Discord.RichEmbed()
    .setTitle('  Crafting Table  |  Mesa de Trabalho  ')
    .setDescription("Tens a certeza que queres criar este item?" + emoji.simnao)
    .addField("Craft", emoji.ferro + emoji.ferro + emoji.ferro + "\n" + emoji.ferro + emoji.bau + emoji.ferro + "\n" + emoji.ferro + emoji.ferro + emoji.ferro)
    .setColor([150, 85, 45])
    .setTimestamp();

         let mess = await message.author.send(embed2);
      await mess.react("545897583671902208")
      await mess.react("545900409672433669");
    
    let simfilter = (r, u) => r.emoji.id === '545897583671902208' && u.id == message.author.id;
  let sim = mess.createReactionCollector(simfilter, { time: 120000});
    let naofilter = (r, u) => r.emoji.id === '545900409672433669' && u.id == message.author.id;
  let nao = mess.createReactionCollector(naofilter, { time: 120000});
    
    sim.on('collect', _ => {
      
      mess.delete().catch(O_o=>{});
      
      if (ferro < 8) return message.author.send("Não tens ferro suficiente..." + emoji.ferro)
      
      if (baus < 1) return message.author.send("Não tens baús suficientes..." + emoji.bau)
      
      
      message.author.send("Báu de Ferro criado com sucesso!" + emoji.sim);
      db.subtract(`${message.author.id}_iron`, 8)
      db.subtract(`${message.author.id}_chest`, 1)
      db.add(`${message.author.id}_ironchest`, 1)
      
    })
    nao.on('collect', _ => {
      
      mess.delete().catch(O_o=>{});
      message.author.send("Criação cancelada!" + emoji.nao);
      
    })
           
           });
  
  baudiamante.on('collect', async _ => {
    
    ct.delete().catch(O_o=>{});
    
    let embed2 = new Discord.RichEmbed()
    .setTitle('  Crafting Table  |  Mesa de Trabalho  ')
    .setDescription("Tens a certeza que queres criar este item?" + emoji.simnao)
    .addField("Craft", emoji.diamante + emoji.diamante + emoji.diamante + "\n" + emoji.diamante + emoji.bau + emoji.diamante + "\n" + emoji.diamante + emoji.diamante + emoji.diamante)
    .setColor([150, 85, 45])
    .setTimestamp();

         let mess = await message.author.send(embed2);
      await mess.react("545897583671902208")
      await mess.react("545900409672433669");
    
    let simfilter = (r, u) => r.emoji.id === '545897583671902208' && u.id == message.author.id;
  let sim = mess.createReactionCollector(simfilter, { time: 120000});
    let naofilter = (r, u) => r.emoji.id === '545900409672433669' && u.id == message.author.id;
  let nao = mess.createReactionCollector(naofilter, { time: 120000});
    
    sim.on('collect', _ => {
      
      mess.delete().catch(O_o=>{});
      
      if (diamante < 8) return message.author.send("Não tens diamante suficiente..." + emoji.diamante)
      
      if (baus < 1) return message.author.send("Não tens baús suficientes..." + emoji.bau)
      
      
      message.author.send("Báu de Diamante criado com sucesso!" + emoji.sim);
      db.subtract(`${message.author.id}_diamond`, 8)
      db.subtract(`${message.author.id}_chest`, 1)
      db.add(`${message.author.id}_diamondchest`, 1)
      
    })
    nao.on('collect', _ => {
      
      mess.delete().catch(O_o=>{});
      message.author.send("Criação cancelada!" + emoji.nao);
      
    })
           
           });
  
}
