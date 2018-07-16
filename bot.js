const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();

// Extensions
var opus = require('opusscript');
var yt = require('ytdl-core');
var fs = require('fs');
const blizzard = require('blizzard.js').initialize({ apikey: config.blizzapi });

const streamOptions = { seek: 0, volume: 1 };
let audioqueue = [];

// Blizzard Access fields
var BnetStrategy = require('passport-bnet').Strategy;
var BNET_ID = process.env.BNET_ID
var BNET_SECRET = process.env.BNET_SECRET

const commands = {
  // MUSIC STUFF
  'play': (message) => {
    if (!message.member.voiceChannel) {
      return message.channel.send('You need to be in a voice channel!');
    }
    let url = message.content.split(' ')[1];
    yt.getInfo(url, function(err, info) {
      if (err) {
        return message.channel.send('Invalid input: Insert youtube URL');
      };
			message.member.voiceChannel.join().then(connection => {
        const stream = yt(url, { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
      }).catch(console.error);
      message.channel.send(`Playing: **${info.title}** - Requested by ***${message.author.username}***`);
    });
    // while (queue.length != 0) {
    //   var next = queue.shift();
    //   message.channel.seek(`Playing: **${next.title}**`)
    // }
  },
  'playlocal': (message) => {
    if (!message.member.voiceChannel) {
      return message.channel.send('You need to be in a voice channel!');
    }
    //let name = message.content.split(' ')[1];
		message.member.voiceChannel.join().then(connection => {
      //const dispatcher = connection.play(config.Mpath); // doesnt work
      const dispatcher = connection.playFile(config.Mpath);
    }).catch(console.error);
    message.channel.send("Playing File: **" + config.Mpath.replace(/^.*[\\\/]/, '') + "**");
  },
  // 'stop': (message) => {
  // },
  // 'pause': (message) => {
  //   if (client.voiceConnection.playing) {
  //     client.voiceConnection.dispatcher.pause();
  //     return message.channel.send("Music player paused");
  //   }
  // },
  // 'unpause': (message) => {
  //   if (client.voiceConnection.paused) {
  //     client.voiceConnection.dispatcher.resume();
  //     return message.channel.send("Music player unpaused");
  //   }
  // },
  // 'add': (message) => {
  // },
  
  // CHANNEL STUFF
  'join': (message) => {
		return new Promise((resolve, reject) => {
      const voiceChannel = message.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') {
        return message.channel.send('Unable to join, please join a voice channel');
      }
      message.channel.send('Joined Channel: ' + '**' + message.member.voiceChannel + '**');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	},
  'help': (message) => {
    let tosend = ['**__All Commands__**',
	  '```JS',
      config.prefix + 'join      "Joins current user voice channel"',
      config.prefix + 'leave     "Leaves current user voice channel"',
      config.prefix + 'play      "Plays music url and joins voice channel if haven\'t"',
      config.prefix + 'playlocal "Plays local file and joins voice channel if haven\'t"',
      config.prefix + 'pause     "Pauses audio stream"',
      config.prefix + 'unpause   "Resumes audio stream"',
      config.prefix + 'realminfo "Logs Blizzard WoW realm data in console"',
      config.prefix + 'echo      "Echoes user input"',
      config.prefix + 'ping      "Returns user latency to voice channel"',
      config.prefix + 'git       "Links git repository"',
      config.prefix + 'prefix    "Changes command prefix"',
    '```'];
		message.channel.send(tosend.join('\n'));
	},
  'leave': (message) => {
    message.member.voiceChannel.leave();
    message.channel.send('Left Channel: ' + '**' + message.member.voiceChannel +'**');
 

      
});


client.login(process.env.BOT_TOKEN);
