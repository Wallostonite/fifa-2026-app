// Vercel serverless function — wraps the Hono server as a Node.js handler.
import { getRequestListener } from "@hono/node-server";
import app from "../build/server/index.js";

// getRequestListener converts Hono's fetch-based API to a Node.js (req, res) handler
// that Vercel's Node.js runtime understands.
export default getRequestListener(app.fetch ?? app);
