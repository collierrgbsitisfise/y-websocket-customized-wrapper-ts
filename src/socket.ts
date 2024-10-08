import type { WebSocket } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import { SocketConnectionQuery, SocketConnectionUrlParams } from "./schemas/sockt.schema";
import { getUserDataFromJwtWithSignatureVerefication } from "./lib/auth";

// @ts-ignore
import { setupWSConnection } from "./../my-f-y-websocket/bin/utils.cjs";

export function handleSocketConnection(socket:  WebSocket, request: FastifyRequest<{ Querystring: SocketConnectionQuery; Params: SocketConnectionUrlParams }>) {
  const { token } = request.query;
  const docName = request.params.docId;

  const user = getUserDataFromJwtWithSignatureVerefication(token);

  if (!user) {
    socket.close(1008, 'Unauthorized');
    return;
  }

  setupWSConnection(socket, request.raw, {
    docName,
    uniqueClientIdentifier: user.userId,
    name: user.name,
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed:', user);
  });
}