const _ = require("lodash");
const channels = require("../db/channels.json");
const userChannels = require("../db/user-channels.json");

const viewTarrif = async () => {
  const channelIds = _.map(userChannels, "channel_id");
  const userChannelsData = channels.filter((channel) => _.includes(channelIds, channel.id));

  const channelNames = _.map(userChannelsData, "name");
  console.log("channel list");
  console.log("=============");
  console.log(channelNames.join("\n"));
};

module.exports = viewTarrif;
