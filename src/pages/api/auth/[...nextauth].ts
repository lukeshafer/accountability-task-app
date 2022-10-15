import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "$server/db/client";
import { env } from "$env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async signIn({ user }) {
      try {
        // THROWS IF USER DOES NOT ALREADY EXIST IN DB
        // THIS CODE SHOULD ONLY BE USED BEFORE PRODUCTION
        const userQuery = await prisma.user.findFirstOrThrow({
          where: { email: user?.email },
        });
        if (userQuery) return true;
        return false;
      } catch {
        return false;
      }
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.image = user.image;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  theme: {
    colorScheme: "light",
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
