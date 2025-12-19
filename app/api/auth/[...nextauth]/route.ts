import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.API_BASE_URL}users/signIn`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();
          console.log(user);
          if (!res.ok) {
            throw new Error(user?.msg || "Something went wrong!");
          }
          const decodedToken = JSON.parse(atob(user.token.split(".")[1]));
          return {
            id: decodedToken.id,
            token: user.token,
          };
        } catch (error) {
          console.log(error);
          throw new Error((error as Error).message || "Something went wrong!");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
