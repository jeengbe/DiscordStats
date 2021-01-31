import * as mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "discordstats",
  password: "",
  database: "discordstats"
});

export const connect = (): void => {
  db.connect();
};
