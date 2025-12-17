import httpMocks, { RequestMethod } from 'node-mocks-http';
import { createEvent, H3Event } from 'h3';
import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Creates a mock H3Event for testing server handlers.
 *
 * @param options - Options for the mock request (method, url, body, etc.).
 * @returns A mocked H3Event instance.
 */
export function createMockH3Event(options: {
  method?: RequestMethod;
  url?: string;
  body?: any;
  headers?: Record<string, string>;
  context?: Record<string, any>;
}): H3Event {
  const request = httpMocks.createRequest<IncomingMessage>(options);
  const response = httpMocks.createResponse<ServerResponse>();

  // node-mocks-http handles standard properties like method, url, and headers
  if (options.body) {
    // For POST/PUT requests, the body needs to be handled to work with h3's readBody utility
    request.setBody(options.body);
  }
  
  // The createEvent function from h3 wraps the raw Node.js req and res
  const event = createEvent(request, response);

  // You can also add custom context properties if your handlers rely on them
  if (options.context) {
    event.context = options.context;
  }

  return event;
}