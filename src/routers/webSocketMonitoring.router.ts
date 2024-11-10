import { FastifyInstance } from "fastify";

import {
  getAllRooms,
  getRoomInfoByDocId,
} from "../controllers/webSocketMonitoring.controller";
import { getActiveRoomInfoByDocIdUrlParamsSchema } from "../schemas/webSocketMonitoring.schema";

async function webSocketMonitoringRouter(app: FastifyInstance) {
  app.route({
    method: "GET",
    url: "/list",
    schema: {},
    handler: getAllRooms,
  });

  app.route({
    method: "GET",
    url: "/:docId",
    schema: {
      params: getActiveRoomInfoByDocIdUrlParamsSchema,
    },
    handler: getRoomInfoByDocId,
  });
}

export { webSocketMonitoringRouter };
