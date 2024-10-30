import fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import fastifyCookie from "@fastify/cookie";
import { promises as fs } from "node:fs";

import {
  socketConnectionQuerySchema,
  socketConnectionUrlParamsSchema,
} from "./schemas/sockt.schema";
import { handleSocketConnection } from "./socket";
import { webSocketMonitoringRouter } from "./routers/webSocketMonitoring.router";

async function getAppVersion() {
  const packageJson = await fs.readFile("./package.json", "utf8");
  return JSON.parse(packageJson).version;
}
const app = fastify({ logger: true });

app.register(fastifyCookie);
app.register(fastifyWebsocket);
app.register(async function (app) {
  app.get(
    "/ws/:docId",
    {
      websocket: true,
      schema: {
        params: socketConnectionUrlParamsSchema,
        querystring: socketConnectionQuerySchema,
      },
    },
    handleSocketConnection
  );
});
app.register(webSocketMonitoringRouter, { prefix: "/api/web-socket-monitoring" });
app.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
  const appVersion = await getAppVersion();
  reply
    .type("text/plain")
    .send(`WebSocket server is running!\nVersion: v${appVersion}`);
});

export { app };
