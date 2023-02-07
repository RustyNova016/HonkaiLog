import {NextAuthOptions} from "next-auth";
import {AuthProviders} from "@/lib/NextAuth/AuthProviders";
import {AuthCallbacks} from "@/lib/NextAuth/AuthCallbacks";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";

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