// Vercel serverless function entry point.
// The react-router-hono-server build outputs a standard Node.js HTTP handler.
// We import it and export a Vercel-compatible handler.
import build from "../build/server/index.js";
export default build;
