import { FastifyInstance } from "fastify";

import { handleSocketConnection } from "./../controllers/socket.controller";
import {
  socketConnectionQuerySchema,
  socketConnectionUrlParamsSchema,
} from "./../schemas/sockt.schema";

async function socketRouter(app: FastifyInstance) {
  // @NOTE preferable way to declate endpoint. This is exception to the rule
  // app.route({
  //   method: ...,
  //   url: ...,
  //   schema: ...,
  //   handler: ...,
  // });
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
}

export { socketRouter };
