import logger from "./logger";

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET: string = process.env["SESSION_SECRET"] || "";
export const MONGODB_URI: string = process.env["MONGODB_URI"] || "";

if (!SESSION_SECRET) {
  logger.error("No session secret. Set SESSION_SECRET environment variable.");
  process.exit(1);
}

if (!MONGODB_URI) {
  logger.error(
    "No mongo connection string. Set MONGODB_URI environment variable."
  );
  process.exit(1);
}
