import NextAuth, {NextAuthOptions} from "next-auth"
import {AuthCallbacks} from "@/lib/NextAuth/AuthCallbacks";
import {AuthProviders} from "@/lib/NextAuth/AuthProviders";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from '@/lib/prismadb'


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
    adapter: PrismaAdapter(prisma),
};
export default NextAuth(authOptions);