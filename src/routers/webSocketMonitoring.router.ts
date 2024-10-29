import { FastifyInstance } from "fastify";

import { getActiveRoomInfoByDocIdUrlParamsSchema } from "../schemas/webSocketMonitoring.schema";
import { getAllRooms, getRoomInfoByDocId } from "../controllers/webSocketMonitoring.controller";

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
