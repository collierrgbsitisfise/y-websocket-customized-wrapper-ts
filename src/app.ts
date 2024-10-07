import fastify, { FastifyRequest, FastifyReply } from "fastify";
import fastifyWebsocket from "@fastify/websocket";

import { socketConnectionQuerySchema, socketConnectionUrlParamsSchema } from "./schemas/sockt.schema";
import { handleSocketConnection } from "./socket";

const app = fastify({ logger: true });

app.register(fastifyWebsocket);
app.register(async function (app) {
  app.get(
    '/ws/:docId',
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

app.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
  reply.type('text/plain').send('WebSocket server is running');
});

export { app };
