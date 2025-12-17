import { beforeAll, afterAll } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Set the environment variable for the test database
  process.env.MONGODB_URI = mongoUri;

  // Connect to the in-memory database only if not already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUri);
  }
}, 60000);

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();

  // Stop the in-memory MongoDB instance
  if (mongoServer) {
    await mongoServer.stop();
  }
}, 60000);

import type { H3Event, EventHandlerRequest } from "h3";
import { vi } from "vitest";

type Handler = (event: H3Event<EventHandlerRequest>) => Promise<unknown>;

export function useH3TestUtils() {
  const h3 = vi.hoisted(() => ({
    defineEventHandler: vi.fn((handler: Handler) => handler),
    readBody: vi.fn(async (event: H3Event) => {
      if (event._requestBody && typeof event._requestBody === "string") {
        return JSON.parse(event._requestBody);
      }
      return event._requestBody || {};
    }),
    getRouterParams: vi.fn((event: H3Event) => event.context?.params || {}),
    getQuery: vi.fn((event: H3Event) => event.context?.query || {}),
  }));

  // Stub the global functions to support auto-imports in your tests
  vi.stubGlobal("defineEventHandler", h3.defineEventHandler);
  vi.stubGlobal("readBody", h3.readBody);
  vi.stubGlobal("getRouterParams", h3.getRouterParams);
  vi.stubGlobal("getQuery", h3.getQuery);

  return h3;
}
