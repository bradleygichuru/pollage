import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import prisma from "../../../lib/prisma";

export const appRouter = trpc.router().mutation("poll-add", {
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
        name: input!.pollDescription,
        options: { createMany: { data: [{ description: input!.opinion1 },{description:input!.opinion2}] } },
      },
    });
    console.log(res)
    return {
      input,
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
