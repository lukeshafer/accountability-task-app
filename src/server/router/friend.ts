import { createProtectedRouter } from "./context";
import { z } from "zod";

export const friendRouter = createProtectedRouter().query("getAll", {
  async resolve({ ctx }) {
    return await ctx.prisma.friendship.findMany({
      where: {
        OR: [
          {
            receiver: ctx.session.user,
          },
          {
            initiator: ctx.session.user,
          },
        ],
      },
    });
  },
});
