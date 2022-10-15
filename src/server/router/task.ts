import { createProtectedRouter } from "./context";
import { z } from "zod";

export const taskRouter = createProtectedRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.task.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
    },
  })
  .mutation("createTask", {
    input: z.object({
      title: z.string(),
      description: z.string(),
    }),

    async resolve({ ctx, input }) {
      return await ctx.prisma.task.create({
        data: {
          userId: ctx.session.user.id,
          title: input.title,
          description: input.description,
        },
      });
    },
  })
  .mutation("deleteTask", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
      return {
        id: result.id,
      };
    },
  })
  .mutation("toggleTask", {
    input: z.object({
      id: z.string(),
      isCompleted: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.task.update({
        data: {
          completed: input.isCompleted,
          completedAt: new Date(),
        },
        where: {
          id: input.id,
        },
      });
      return {
        id: result.id,
      };
    },
  });
