const Discord = require('discord.js');
const emoji = require('../emoji.json');
const weather = require("weather-js");

exports.run = async (client, message, args) => {
  
  let erro = new Discord.RichEmbed()
  .setColor([26, 224, 204])
  .setTitle("comando ***clima***")
  .setDescription("Vê a temperatura de um local do mundo")
  .addField("Utilização🔨", "r!clima [local]")
  .addField("Exemplo", `r!clima Oeiras, Lisboa`)
  .addField("Tu não nececitas de nenhuma permissão!!!", emoji.snowball1 + emoji.snowball2)
  .setFooter("Tenta de novo!", message.author.avatarURL)
  .setTimestamp();
  
  if (args.length < 1) {
        message.channel.send(erro);
        return 0;
    }
    weather.find({search: args.join(' '), degreeType: 'C', lang: 'pt-PT'}, (err, result) => {
        if (err) throw err;
        result = result[0]; 
        if (!result) {
            message.channel.send(erro);
            return;
        }
        var current = result.current;
        var location = result.location;
       var forecast = result.forecast[1]
        const embed = new Discord.RichEmbed()
        .setAuthor(`Tempo para: ${location.name}`)
        .setDescription(`${current.skytext}`)
        .addField(':thermometer: Temperatura:',`**Mínima:** ${forecast.low}° C\n**Atual:** ${current.temperature}° C\n**Máxima:** ${forecast.high}° C`, true)
        .addField(':thermometer_face: Sensação térmica:', `${current.feelslike}° C`, true)
        .addField(':dash: Ventos:', current.winddisplay, true)
        .addField(':sweat_drops: Umidade:', `${current.humidity}%`, true)
        .setColor([75, 194, 237])
        .setFooter("Pedido por " + message.author.tag, message.author.avatarURL)
        .setTimestamp();
        message.channel.send({embed});
    });
  
}