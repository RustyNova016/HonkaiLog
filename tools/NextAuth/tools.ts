import GitHubProvider from "next-auth/providers/github";
import {Account, CallbacksOptions, Profile} from "next-auth";
import {Provider} from "next-auth/providers";

export const AuthProviders: Provider[] = [
    GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
];

export const AuthCallbacks: Partial<CallbacksOptions<Profile, Account>> = {
    session: async ({session, token}) => {
        if (session?.user) {
            if (token?.sub !== undefined) {
                session.user.id = token.sub;
            }
        }
        return session;
    },
}

export function isNumericString(str: any): str is string {
    if (typeof str !== 'string') {
        return false;
    }

    if (str.trim() === '') {
        return false;
    }

    return !Number.isNaN(Number(str));
}