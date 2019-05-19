const Discord = require('discord.js');
const emoji = require('../emoji.json');

exports.run = async (client, message, args) => {
  
  let bots = message.guild.members.filter(m => m.user.bot).size;
let humanos = message.guild.memberCount - bots;
  
  let online = 0, idle = 0, dnd = 0, offline = 0;
  for (let m of message.guild.members.array()) {
    if (m.user.presence.status === "online") online += 1;
    if (m.user.presence.status === "idle") idle += 1;
    if (m.user.presence.status === "dnd") dnd += 1;
    if (m.user.presence.status === "offline") offline += 1;
  }
  
  let regiao = message.guild.region;
  
  if (message.guild.region == "eu-west") regiao = ":flag_eu: Europa Ocidental";
  if (message.guild.region == "brazil") regiao = ":flag_br: Brasil";
  if (message.guild.region == "eu-central") regiao = ":flag_eu: Europa Central";
  if (message.guild.region == "hongkong") regiao = ":flag_hk: Hong Kong";
  if (message.guild.region == "japan") regiao = ":flag_jp: Japão";
  if (message.guild.region == "russia") regiao = ":flag_ru: Russia";
  if (message.guild.region == "singapore") regiao = ":flag_sg: Singapura";
  if (message.guild.region == "southafrica") regiao = ":flag_za: Africa do Sul";
  if (message.guild.region == "sydney") regiao = ":flag_au: Sydney";
  if (message.guild.region == "us-central") regiao = ":flag_us: América Central";
  if (message.guild.region == "us-east") regiao = ":flag_us: América Leste";
  if (message.guild.region == "us-south") regiao = ":flag_us: América do Sul";
  if (message.guild.region == "us-west") regiao = ":flag_us: América Ocidental";
  
  let embedA = new Discord.RichEmbed()
  .setColor([0, 138, 237])
  .setTitle("Informações do servidor")
  .setThumbnail(message.guild.iconURL)
  .addField("Nome", message.guild.name, true)
  .addField("Id", message.guild.id, true)
  .addField("Membros", message.guild.memberCount + "\n└" + humanos + " humanos\n└" + bots + " bots\n" + emoji.vazio + "└" + online + " online" + emoji.online + "\n" + emoji.vazio + "└" + idle + " ausentes" + emoji.ausente + "\n" + emoji.vazio + "└" + dnd + " Não perturbar" + emoji.dnd + "\n" + emoji.vazio + "└" + offline + " offline" + emoji.offline, true)
  .addField("Canais", message.guild.channels.size, true)
  .addField("Região :map:", regiao, true)
  .addField("Dono", "<@" + message.guild.ownerID + ">", true)
  .addField("Cargos", message.guild.roles.size, true)
  .addField("Meu prefixo neste servidor", "```" + client.prefix + "```", true)
  .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
  .setTimestamp();
  message.channel.send(embedA);
  
}