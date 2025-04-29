import app from "./app";
import config from "./config/config";
import Logger from "./lib/logger";

const SERVER_START_MESSAGE = "Server running on port";

async function startServer(port: number): Promise<void> {
  try {
    await new Promise<void>((resolve) => {
      app.listen(port, () => {
        Logger.info(`${SERVER_START_MESSAGE} ${port}`);
        resolve();
      });
    });
  } catch (error) {
    Logger.error(
      `Failed to start server: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    process.exit(1);
  }
}

startServer(config.port).catch((error) => {
  Logger.error("Unhandled error during server startup:", error);
  process.exit(1);
});
