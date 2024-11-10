import { promises as fs } from "node:fs";

import { FastifyReply, FastifyRequest } from "fastify";

export async function getServerInfo(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const appVersion = await getAppVersion();
  reply
    .type("text/plain")
    .send(`WebSocket server is running!\nVersion: v${appVersion}`);
}

async function getAppVersion() {
  const packageJson = await fs.readFile("./package.json", "utf8");
  return JSON.parse(packageJson).version;
}
