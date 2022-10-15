// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { taskRouter } from "./task";
import { friendRouter } from "./friend";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("task.", taskRouter)
  .merge("friend.", friendRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
