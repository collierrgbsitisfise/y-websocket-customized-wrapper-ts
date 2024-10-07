import path from "node:path";

import dotenv from "dotenv";

export default dotenv.config({
  path: path.join(__dirname, "..", "..", ".env"),
});
