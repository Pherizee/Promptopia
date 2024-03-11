import User from "@models/user";
import { connectToDB } from "@utils/database";
import { Session, User as UserType } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const user = session.user as UserType;

      if (user) {
        const sessionUser = await User.findOne({
          email: user?.email,
        });
        user!.id = sessionUser._id.toString();
      }
      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectToDB();

        // check if the user already exists
        const userExists = await User.findOne({ email: profile!?.email });
        // else create a new user and add it to the database
        if (!userExists) {
          await User.create({
            email: profile!?.email,
            username: profile!?.name?.replace(" ", "")?.toLowerCase(),
            image: profile?.image,
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
