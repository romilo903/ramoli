const Discord = require('discord.js')

exports.run = async (client, message, args) => {
	
	let user = message.mentions.users.first() || client.users.get(args[0])
	
	if (!user) return message.channel.send(' Uso correto: `' + client.prefix + 'batalha [@user]`')
	
	if (message.author === user) return message.reply('não podes batalhar contigo próprio!!')
	
	if (user === client.user) return message.reply('eu sou o árbito, não podes batalhar comigo!!')
	
	let authorPoints = 0 
	let userPoints = 0
	let authorVida = 100
	let userVida = 100
	let end = false
	let vencedor
	let vencedorVida
	let perdedorVida
	let vencedorPoints
	let perdedor
	
	const gifs = ["https://i.gifer.com/3beA.gif", "https://i.gifer.com/kb.gif", "https://i.gifer.com/7z3p.gif", "https://i.gifer.com/W6A3.gif", "https://i.gifer.com/3Nsec.gif", "https://i.gifer.com/3Nsed.gif", "https://i.gifer.com/7z2S.gif", "https://i.gifer.com/KXXV.gif", "https://i.gifer.com/3Nsf4.gif", "https://i.gifer.com/nK.gif", "https://i.gifer.com/3Nseb.gif", "https://i.gifer.com/3Nsee.gif", "https://i.gifer.com/3Nsey.gif"]

	const gif = gifs[Math.floor(Math.random() * gifs.length)]
	
	let start = new Discord.RichEmbed()
	.setTitle('A batalha começou!')
	.setImage(gif)
	.setDescription(message.author + ' **está agora em batalha com** ' + user + '**!!**')
	.setColor('#6d2cd6')
	.setFooter('Pedido por ' + message.author.tag, message.author.displayAvatarURL)
	.setTimestamp()
	
	let m = await message.channel.send(start)
	
	setTimeout(action, 3555)
	
	function action() {
		
		if (end == true) return
		
		if (authorVida <= 0 || userVida <= 0) {
			if (authorVida <= 0) {
				vencedor = user
				vencedorVida = userVida
				vencedorPoints = userPoints
				perdedorVida = authorVida
				perdedor = message.author
			}
			if (userVida <= 0) {
				vencedor = message.author
				vencedorVida = authorVida
				vencedorPoints = authorPoints
				perdedorVida = userVida
				perdedor = user
			}
			
			let ended = new Discord.RichEmbed()
			.setAuthor('A batalha terminou!!', "https://cdn.glitch.com/157bd81d-db6e-4d6c-9f56-4071e7790977%2Fscoreboard.png?1554404310224")
			.addField(":first_place: Vencedor", vencedor, true)
			.addField(":spider_web: Perdedor", perdedor, true)
			.addField('♥️ Vida', '•' + vencedor + ': **' + vencedorVida + '**\n•' + perdedor + ': **' + perdedorVida + '**', true)
			.addField('🌟 Recompensas', '•' + vencedor + ':\n**+`1` vitória\n+`' + vencedorPoints * 5 + '` xp\n+`' + vencedorPoints * 2 + '` moedas**\n\n•' + perdedor + ':\n**+`1` derrota**', true)
			.setColor('#6d2cd6')
			.setThumbnail(gif)
			.setFooter('Pedido por ' + message.author.tag, message.author.displayAvatarURL)
			.setTimestamp()
			
			m.edit(ended)
			
			return end = true
		}
		
		
		let embed = new Discord.RichEmbed()
		.setTitle('Batalha: ' + message.author.username + ' vs ' + user.username)
		.setDescription(randomUser())
		.addField("🌟 Pontuação", "•" + message.author + ': **' + authorPoints + "**\n•" + user + ": **" + userPoints + "**", true)
		.addField("♥️ Vida", "•" + message.author + ': **' + authorVida + "**\n•" + user + ": **" + userVida + "**", true)
		.setFooter('Pedido por ' + message.author.tag, message.author.displayAvatarURL)
		.setImage(gif)
		.setColor('#6d2cd6')
		.setTimestamp();
		
		m.edit(embed)
		
		setTimeout(action, 3000)
	}
	
	function randomUser() {
		let us = []
		let rrr = Math.round(Math.random() * 1)
		if (rrr == 0) {
			us[0] = message.author
			us[1] = user
			authorPoints += 1
			userVida = userVida - (Math.floor(Math.random() * 5) + 5)
		}
		if (rrr == 1) {
			us[0] = user
			us[1] = message.author
			userPoints += 1
			authorVida = userVida - (Math.floor(Math.random() * 5) + 5)
		}
		
		const frase = ["chutou o(a)", "bateu no(a)", "esmagou o(a)", "empurrou o(a)"]
		
		if (authorVida < 0) authorVida = 0
		if (userVida < 0) userVida =0
		
		
		return us[0] + " **" + frase[Math.floor(Math.random() * frase.length)] + "** " + us[1]
	}
	
}