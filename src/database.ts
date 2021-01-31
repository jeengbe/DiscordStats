import { db } from "./connection";
import * as Discord from "discord.js";

export const addServer = (server: Discord.Guild): void => {
  db.query("INSERT INTO servers (ID, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)", [server.id, server.name]);
};

export const addUser = (user: Discord.GuildMember): void => {
  db.query("INSERT INTO users (ID, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)", [user.id, user.nickname || user.displayName]);
};

export const addChannel = (channel: Discord.Channel & { name: string }): void => {
  db.query("INSERT INTO channels (ID, type, name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name)", [channel.id, channel.type, channel.name]);
};

export const voiceAction = (server: Discord.Snowflake, channel: Discord.Snowflake, user: Discord.Snowflake, join: boolean): void => {
  db.query("INSERT INTO voicelog (timestamp, server, channel, user, action) VALUES (?, ?, ?, ?, ?)", [Date.now() / 1000, server, channel, user, join ? "connect" : "disconnect"]);
};