import { createTRPCRouter } from "~/server/api/trpc";
import { relicRouter } from "./routers/relic";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  relic: relicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
