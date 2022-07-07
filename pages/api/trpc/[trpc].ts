import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export const appRouter = trpc
  .router()
  .mutation("add-poll", {
    input: z
      .object({
        opinion1: z.string(),
        opinion2: z.string(),
        pollDescription: z.string(),
      })
      .nullish(),
    async resolve({ input }) {
      console.log(input); //TODO remove debug logs
      let res = await prisma.poll.create({
        data: {
          name: input?.pollDescription!,
          opinions: {
            createMany: {
              data: [
                { description: input?.opinion1!, count: 0 },
                { description: input?.opinion2!, count: 0 },
              ],
            },
          },
        },
      });
      console.log(res);
      return res;
    },
  })
  .mutation("cast-vote", {
    input: z.object({ opinionId: z.string(), pollId: z.string() }).nullish(),
    async resolve({ input }) {
      console.log(input);
      await prisma.opinion.update({
        where: { id: input?.opinionId },
        data: { count: { increment: 1 } },
      });
      let result = await prisma.poll.findUnique({
        where: { id: input?.pollId },
        include: { opinions: true },
      });
      return result;
    },
  })
  .query("get-poll", {
    input: z
      .object({
        id: z.string(),
      })
      .nullish(),
    async resolve({ input }) {
      let res = await prisma.poll.findUnique({
        where: { id: input?.id },
        include: { opinions: true },
      });
      return res;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
