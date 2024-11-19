import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { clientPromise } from "./mongo";
import { connectDB } from "./mongo";
import User from "@/models/User";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.given_name ? profile.given_name : profile.name,
          email: profile.email,
          image: profile.picture,
          createdAt: new Date(),
        };
      },
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        try {
          await connectDB();
          const dbUser = await User.findOne({ email: session.user.email })
            .lean()
            .exec();
          if (dbUser) {
            session.user.role = dbUser.role || "user";
            session.user.id = dbUser._id.toString();
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          session.user.role = "user"; // fallback role
        }
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },
};
