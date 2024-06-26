import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import sanityClient from "./sanity";
import { SanityClient } from "sanity";
import { NextAuthOptions } from "next-auth";

// Type assertion here
const typedSanityClient: SanityClient = sanityClient as SanityClient;

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    SanityCredentials(typedSanityClient),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(typedSanityClient),
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    session: async ({session, token}) => {
      const userEmail = token.email;
      const userIdobj = await sanityClient.fetch<{_id: string}>(
        `*[_type == "user" && email == $email][0]{
          _id
        }`, {email: userEmail}
        );
  
        return {
          ...session,
          user: {
            ...session.user,
            id: userIdobj._id,
          }
        }
    }
  },
};

