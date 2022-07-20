import NextAuth from "next-auth"
import {AuthCallbacks, AuthProviders} from "../../../tools/NextAuth/tools";
import {AuthDBAdapter} from "../../../database/database";

export default NextAuth({
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
});