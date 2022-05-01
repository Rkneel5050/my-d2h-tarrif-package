const fs = require("fs");
const path = require("path")
const inquirer = require("inquirer");
const channels = require("../db/channels.json");
const userChannels = require("../db/user-channels.json");

const removeChannel = async () => {
  try {
    const channelObj = await inquirer.prompt([
      {
        name: "channel",
        message: "please type channel name to remove from your terrif plan : ",
      },
    ]);

    const existingChannel = channels.find((el) => el.name == channelObj.channel);
    if (!existingChannel) throw new Error(`You don't have ${channelObj.channel} in your tariff plan`);

    let userChannelIndex = userChannels.findIndex((el) => el.channel_id == existingChannel.id);

    if (userChannelIndex === -1) throw new Error(`You don't have ${channelObj.channel} in your tariff plan`);
    userChannels.splice(userChannelIndex, 1);
    
    fs.writeFile(path.resolve(__dirname, "../db/user-channels.json"), JSON.stringify(userChannels), (err) => {
      if (err) console.log("error while removing userChannels ", err);
    });

    console.info("Channel removed.")
  } catch (error) {
    throw error;
  }
};

module.exports = removeChannel;
