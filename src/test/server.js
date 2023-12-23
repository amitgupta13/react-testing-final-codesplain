import { rest } from "msw";
import { setupServer } from "msw/node";

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) =>
    rest[config.method || "get"](config.path, (req, res, ctx) =>
      res(ctx.json(config.res(req, res, ctx)))
    )
  );

  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
