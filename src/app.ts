import fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import fastifyCookie from "@fastify/cookie";

import {
  socketConnectionQuerySchema,
  socketConnectionUrlParamsSchema,
} from "./schemas/sockt.schema";
import { handleSocketConnection } from "./socket";
import { webSocketMonitoringRouter } from "./routers/webSocketMonitoring.router";
import { operationalRouter } from "./routers/operational.router";

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
app.register(operationalRouter, { prefix: "/" });

export { app };
