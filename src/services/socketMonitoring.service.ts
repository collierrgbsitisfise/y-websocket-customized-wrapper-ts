import type { WebSocket } from "@fastify/websocket";

type UserConnection = {
  userId: string;
  additionalData: Record<string, unknown>;
  connectionTime: Date;
};

type RoomInfo = {
  docId: string;
  connections: Map<WebSocket, UserConnection>;
  createdAt: Date;
};

class SocketMonitoring {
  private static instance: SocketMonitoring;
  private rooms: Map<string, RoomInfo>;

  private constructor() {
    this.rooms = new Map();
  }

  static getInstance(): SocketMonitoring {
    if (!SocketMonitoring.instance) {
      SocketMonitoring.instance = new SocketMonitoring();
    }
    return SocketMonitoring.instance;
  }

  addConnection(docId: string, socket: WebSocket, userData: UserConnection) {
    let roomInfo = this.rooms.get(docId);

    if (!roomInfo) {
      roomInfo = {
        docId,
        connections: new Map(),
        createdAt: new Date(),
      };
      this.rooms.set(docId, roomInfo);
    }

    roomInfo.connections.set(socket, userData);
  }

  removeConnection(docId: string, socket: WebSocket) {
    const roomInfo = this.rooms.get(docId);
    if (roomInfo) {
      roomInfo.connections.delete(socket);

      if (roomInfo.connections.size === 0) {
        this.rooms.delete(docId);
      }
    }
  }

  getRooms() {
    return Array.from(this.rooms.entries()).map(([docId, info]) => ({
      docId,
      connectionCount: info.connections.size,
      createdAt: info.createdAt,
    }));
  }

  getRoomInfo(docId: string) {
    const roomInfo = this.rooms.get(docId);
    if (!roomInfo) return null;

    return {
      docId,
      createdAt: roomInfo.createdAt,
      connections: Array.from(roomInfo.connections.values()).map((conn) => ({
        userId: conn.userId,
        additionalData: conn.additionalData,
        connectionTime: conn.connectionTime,
      })),
    };
  }
}

export const socketMonitor = SocketMonitoring.getInstance();
