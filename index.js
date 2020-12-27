const Discord = require("discord.js");
const auth = require("./auth.json");
fs = require('fs');
const startTime = new Date ();

const client = new Discord.Client();

const prefix = "!";



client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
  }

  else if (command === "sum") {
    const numArgs = args.map(x => parseFloat(x));
    const sum = numArgs.reduce((counter, x) => counter += x);
    message.reply(`The sum of all the arguments you provided is ${sum}!`);
  }

  else if (command === "burn") {
    message.channel.send("Burn Baby!", {files: ["./assets/fire.gif"]});
  }
  
});

client.login(auth.BOT_TOKEN);

if(!fs.existsSync("logs")){
    fs.mkdirSync("logs", 0766, function(err){
        if(err){
            console.log(err);
            // echo the result back
            response.send("ERROR! Can't make the directory! \n");
        }
    });
}
function log(directinput){
    try{
        var input = directinput
        var fileDate = (startTime.getFullYear() + "-" + (startTime.getMonth() + 1) + "-" + startTime.getDate() + "-" + startTime.getHours() + ";" + startTime.getMinutes() + ";" + startTime.getSeconds() + ";" + startTime.getMilliseconds())
        var fileName = ("logs/" + fileDate + ".log")
        var commandDate = new Date()
        var commandTime = (commandDate.getFullYear() + "-" + (commandDate.getMonth() + 1) + "-" + commandDate.getDate() + "-" + commandDate.getHours() + ";" + commandDate.getMinutes() + ";" + commandDate.getSeconds() + ";"  + commandDate.getMilliseconds() + ":" + " ")
        var fileoutputstring = ("\n" + commandTime + input)
        var consoleoutputstring = (commandTime + input)
        fs.appendFile(fileName, fileoutputstring, function (error) {
            if (error) throw error;
        });
        console.log(consoleoutputstring)
        }
    catch(error){
        console.log(error)
    }
};

log("Servers: " + client.guilds.cache.size)
client.guilds.cache.forEach((guild) => {
    log("- " + guild.name)
});