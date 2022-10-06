import { createProtectedRouter } from "./context";
import { z } from "zod";

export const taskRouter = createProtectedRouter()
  .mutation("createTask", {
    input: z.object({
      title: z.string(),
      description: z.string(),
    }),

    async resolve({ ctx, input }) {
      const result = await ctx.prisma.task.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          description: input.description,
        },
      });
      return {
        id: result.id,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.task.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  });
