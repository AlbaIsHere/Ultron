const { MessageEmbed } = require('discord.js');
const Guild = require('../../db/schema/guild')
module.exports.run = async (client , message, args, datas)  => {
    const setting = await Guild.findOne({id: message.guild.id})
    const res = await args.join(" ")
    const confi = new MessageEmbed()
    .setTitle('Want to configure Sliwers?')
    .setColor('RED')
    .setDescription('Please put a `prefix`!')
    const oldPrefix = setting.prefix
    if(message.mentions.members.first()){

     message.channel.send(confi)
    }else{
    const change = new MessageEmbed()
    .setTitle('Prefix Modified')
    .setColor('GREEN')
    .setDescription(`Your prefix has been modified here is your new prefix ${res} | Before ${oldPrefix} => After ${res}`)
    if(!res) return message.channel.send(confi)
    if(res){
        await message.channel.send(change)
       const doc = await Guild.findOneAndUpdate({id: message.guild.id} , {$set : {prefix: res}}, { new :true})
       doc.prefix
    }
  }

   
}
module.exports.help = {
  name: "setprefix",
  aliases : ['prefix'],
  permissions : ["MANAGE_GUILD"],
  category: "config",
  description: "Change the bot prefix",
  usage : '<valeur>',
  isUserAdmin: false,
  botPerms : false,
  args: true
  
}