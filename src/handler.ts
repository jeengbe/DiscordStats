import * as Discord from "discord.js";

import { addServer, addUser, addChannel, voiceAction } from "./database";

export const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (oldState.member !== null && newState.member !== null && newState.channel !== oldState.channel) {
    if (newState.channel !== null && newState.channelID !== null) {
      // Joined Channel
      addServer(newState.guild);
      addUser(newState.member);
      addChannel(newState.channel);
      voiceAction(newState.guild.id, newState.channelID, newState.id, true);

      console.log(`(${newState.guild.name}) ${newState.member.nickname || newState.member.displayName} connected to ${newState.channel.name}`);
    }

    if (oldState.channel !== null && oldState.channelID !== null) {
      // Left Channel
      voiceAction(oldState.guild.id, oldState.channelID, oldState.id, false);

      console.log(`(${oldState.guild.name}) ${oldState.member.nickname || oldState.member.displayName} left ${oldState.channel.name}`);
    }
  }
});

export const connect = (): void => {
  client.login("");
};