import fastifyCookie from "@fastify/cookie";
import fastifyWebsocket from "@fastify/websocket";
import fastify from "fastify";

import { operationalRouter } from "./routers/operational.router";
import { webSocketMonitoringRouter } from "./routers/webSocketMonitoring.router";
import {
  socketConnectionQuerySchema,
  socketConnectionUrlParamsSchema,
} from "./schemas/sockt.schema";
import { handleSocketConnection } from "./socket";

const app = fastify({ logger: true });

app.register(fastifyCookie);
app.register(fastifyWebsocket);
app.register(function (app) {
  app.get(
    "/ws/:docId",
    {
      websocket: true,
      schema: {
        params: socketConnectionUrlParamsSchema,
        querystring: socketConnectionQuerySchema,
      },
    },
    handleSocketConnection,
  );
});
app.register(webSocketMonitoringRouter, {
  prefix: "/api/web-socket-monitoring",
});
app.register(operationalRouter, { prefix: "/" });

export { app };
