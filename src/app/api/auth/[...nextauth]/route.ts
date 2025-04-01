import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

// Exporta la configuración de NextAuth para ser usada por Next.js
const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      console.log("User ID in session:", user.id);
      session.user.id = user.id;  // Agregar el ID del usuario a la sesión
      return session;
    },
  },
  debug: true, 
});

// Exporta la función `GET` y `POST` que Next.js usará para manejar las rutas API
export { handler as GET, handler as POST };
