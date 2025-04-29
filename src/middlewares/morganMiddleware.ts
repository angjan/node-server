import morgan, { StreamOptions } from "morgan";

import Logger from "../lib/logger";
import { isDevelopment } from "../helpers/helpers";

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
  // Use the http severity
  write: (message) => Logger.http(message),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
const skip = () => {
  return !isDevelopment();
};

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define a message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what you want from a request.
  ":method :url :status :res[content-length] - :response-time ms",
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip },
);

export default morganMiddleware;
