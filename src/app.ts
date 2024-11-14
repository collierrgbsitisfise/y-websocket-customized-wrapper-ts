import fastifyCookie from "@fastify/cookie";
import fastifyWebsocket from "@fastify/websocket";
import fastify from "fastify";

import { operationalRouter } from "./routers/operational.router";
import { socketRouter } from "./routers/socket.router";
import { socketMonitoringRouter } from "./routers/socketMonitoring.router";

const app = fastify({ logger: true });

app.register(fastifyCookie);
app.register(fastifyWebsocket);
app.register(socketRouter, {
  prefix: "/ws",
});

// @deprecated
// in favour to `/api/socket-monitoring`, if not used feel free to remove
app.register(socketMonitoringRouter, {
  prefix: "/api/web-socket-monitoring",
});
app.register(socketMonitoringRouter, {
  prefix: "/api/socket-monitoring",
});

app.register(operationalRouter, { prefix: "/" });

export { app };
