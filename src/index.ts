process.stdout.write("\x1Bc");
console.log("App starting...");

import * as conn from "./connection";
import * as handler from "./handler";

conn.connect();
handler.connect();