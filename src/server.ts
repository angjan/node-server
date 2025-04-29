import app from "./app";
import config from "./config/config";
import Logger from "./lib/logger";

app.listen(config.port, () => {
  Logger.info(`Server running on port ${config.port}`);
});
