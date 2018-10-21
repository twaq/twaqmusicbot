const Discord = require("discord.js");
const client = new Discord.Client();

/*
البكجآت
npm install discord.js
npm install ytdl-core
npm install get-youtube-id
npm install youtube-info
npm install simple-youtube-api
npm install queue    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setSta **] \`${video2.title}\``).join('\n')}`)
					.setFooter("TWAQ.")
					msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})
					
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 30000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('you did not choose a song');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(':X:no results ');
				}
			}

			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === `skip`) {
		if (!msg.member.voiceChannel) return msg.channel.send('you are not in a voice channel.');
		if (!serverQueue) return msg.channel.send('no song to skip`');
		serverQueue.connection.dispatcher.end('skipped :white_check_mark: ');
		return undefined;
	} else if (command === `stop`) {
		if (!msg.member.voiceChannel) return msg.channel.send('you are not in a voice channel .');
		if (!serverQueue) return msg.channel.send('no songs to stop');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Done :white_check_mark: ');
		return undefined;
	} else if (command === `vol`) {
		if (!msg.member.voiceChannel) return msg.channel.send('you are not in a voiceChannel .');
		if (!serverQueue) return msg.channel.send('no songs.');
		if (!args[1]) return msg.channel.send(`:loud_sound: the voice **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 20);
		return msg.channel.send(`:speaker: voice changes :white_check_mark:  **${args[1]}**`);
	} else if (command === `np`) {
		if (!serverQueue) return msg.channel.send('nothing woerks.');
		const embedNP = new Discord.RichEmbed()
	.setDescription(`:notes: playing : **${serverQueue.songs[0].title}**`)
		return msg.channel.sendEmbed(embedNP);
	} else if (command === `queue`) {
		if (!serverQueue) return msg.channel.send('nothing woerks.');
		let index = 0;
		const embedqu = new Discord.RichEmbed()
.setDescription(`**Songs Queue**
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}
**الان يتم تشغيل** ${serverQueue.songs[0].title}`)
		return msg.channel.sendEmbed(embedqu);
	} else if (command === `pause`) {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('pause :white_check_mark: ');
		}
		return msg.channel.send('nothing woerks.');
	} else if (command === "resume") {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('resume :white_check_mark: !');
		}
		return msg.channel.send('no songs');
	}

	return undefined;
});
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);
		queueConstruct.songs.push(song);
		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`i could not join the voice channel ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(` **${song.title}** sond add to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);
	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`start playing : **${song.title}**`);
}
});


client.on('message', message => {
	var prefix = "!!!!";
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.id !== '413293362918195201') return;


if (message.content.startsWith(prefix + 'setname')) { //تغير اسم البوت
          client.user.setUsername(argresult);
          message.channel.send(` \`${argresult}\` : done `).then(msg => msg.delete(6000))
          }
 else 
if (message.content.startsWith(prefix + 'setavatar')) {//تغير صورة البوت 
          client.user.setAvatar(argresult);
          message.channel.send(`\`${argresult}\` : done `).then(msg => msg.delete(6000))
  



}
});



client.on('message', message => {
 var prefix = "!!!!";
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.id !== '413293362918195201') return;

if (message.content.startsWith(prefix + 'p')) {
  client.user.setGame(argresult);
    message.channel.sendMessage(`**:white_check_mark:  : ${argresult}**`)
} else 
if (message.content.startsWith(prefix + 'w')) {
client.user.setActivity(argresult, {type:'WATCHING'});
    message.channel.sendMessage(`**:white_check_mark:  : ${argresult}**`)
} else 
if (message.content.startsWith(prefix + 'l')) {
client.user.setActivity(argresult, {type:'LISTENING'});
    message.channel.sendMessage(`**:white_check_mark:  : ${argresult}**`)
} else 
if (message.content.startsWith(prefix + 's')) {
  client.user.setGame(argresult, "https://www.twitch.tv/idk%22");
    message.channel.sendMessage(`**:white_check_mark:  : ${argresult}**`)
}

});



 client.on('message' , message => {

    if (message.content === ".دعوه") {
        if(!message.channel.guild) return message.reply('**الآمر فقط في السيرفرات**');
     const embed = new Discord.RichEmbed()
 .setColor("RANDOM")
 .setThumbnail(client.user.avatarURL)     
 .setDescription("Add me" + `
 **
رابط البوت | https://discordapp.com/api/oauth2/authorize?client_id=429761300823015425&permissions=120978497&scope=bot
 **
`);
  message.author.sendEmbed(embed);
   }
});


client.login(process.env.BOT_TOKEN);
