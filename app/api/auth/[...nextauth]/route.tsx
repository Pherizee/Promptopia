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
        user.id = sessionUser._id.toString();
      }
      return session;
    },

    async signIn({ user }) {
      try {
        await connectToDB();

        // check if the user already exists
        const userExists = await User.findOne({ email: user.email });

        // else create a new user and add it to the database
        if (!userExists) {
          const response = await User.create({
            email: user.email,
            name: user.name?.replace(" ", "")?.toLowerCase(),
            image: user.image,
          });

          console.log(response);
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
