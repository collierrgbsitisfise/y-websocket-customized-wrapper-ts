import { app } from "./app";
import { config } from "./config";

const start = async () => {
  try {
    await app.listen({
      host: config.ADDRESS,
      port: config.PORT,
    });
    app.log.info("server started");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
