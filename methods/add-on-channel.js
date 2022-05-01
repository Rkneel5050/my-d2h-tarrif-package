const fs = require("fs");
const path = require("path")
const _ = require("lodash");
const inquirer = require("inquirer");
const user = require("../db/user.json");
const categories = require("../db/categories.json");
const channels = require("../db/channels.json");
const userChannels = require("../db/user-channels.json");

const addOnChannel = async () => {
  try {
    const categoryData = _.map(categories, "name");

    const package = await inquirer.prompt([
      {
        type: "list",
        message: "Please choose any category : ",
        name: "category",
        choices: categoryData,
      },
    ]);
    const categoryObj = categories.find((el) => el.name === package.category);

    let channelData = channels.filter((el) => el.category_id == categoryObj.id);
    channelData = _.map(channelData, "name");

    const channelResult = await inquirer.prompt([
      {
        type: "list",
        message: "Please choose any channel : ",
        name: "channel",
        choices: channelData,
      },
    ]);

    let channelObj = channels.find((el) => el.name === channelResult.channel);

    let existingChannel = userChannels.findIndex((el) => el.channel_id == channelObj.id);
    if (existingChannel !== -1) throw new Error("Channel already exist in your tarrif package!");

    if (channelObj.price <= user.balance) {
      // update user_channels
      userChannels.push({
        id: userChannels.length + 1,
        user_id: user.id,
        channel_id: channelObj.id,
      });

      fs.writeFile(path.resolve(__dirname, "../db/user-channels.json"), JSON.stringify(userChannels), (err) => {
        if (err) console.error("error while adding userChannels ", err);
      });

      // update user balance
      user.balance = user.balance - channelObj.price;

      fs.writeFile(path.resolve(__dirname, "../db/user.json"), JSON.stringify(user), (err) => { 
        if (err) console.error("error while adding balance ", err);
      });

      console.info("Channel added in your tarrif package!")
    } else {
      throw new Error("You don’t have sufficient balance to add this channel in your tariff plan");
    }
  } catch (error) {
    console.error(`Error while add on channel ${error.message}`)
    throw error
  }
};

module.exports = addOnChannel;
