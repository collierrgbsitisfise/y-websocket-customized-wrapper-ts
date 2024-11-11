import fastifyCookie from "@fastify/cookie";
import fastifyWebsocket from "@fastify/websocket";
import fastify from "fastify";

import { operationalRouter } from "./routers/operational.router";
import { socketRouter } from "./routers/socket.router";
import { webSocketMonitoringRouter } from "./routers/webSocketMonitoring.router";

const app = fastify({ logger: true });

app.register(fastifyCookie);
app.register(fastifyWebsocket);
app.register(socketRouter, {
  prefix: "/ws",
});
app.register(webSocketMonitoringRouter, {
  prefix: "/api/web-socket-monitoring",
});
app.register(operationalRouter, { prefix: "/" });

export { app };
