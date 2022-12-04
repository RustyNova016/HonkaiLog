import NextAuth, {NextAuthOptions} from "next-auth"
import {AuthDBAdapter} from "@/lib/NextAuth/AuthDBAdapter";
import {AuthCallbacks} from "@/lib/NextAuth/AuthCallbacks";
import {AuthProviders} from "@/lib/NextAuth/AuthProviders";

export const authOptions: NextAuthOptions = {
    providers: AuthProviders,
    callbacks: AuthCallbacks,
    secret: "test",
    session: {
        strategy: 'jwt',
    },
    jwt: {
        secret: "test",
    },
    adapter: AuthDBAdapter,
};
export default NextAuth(authOptions);