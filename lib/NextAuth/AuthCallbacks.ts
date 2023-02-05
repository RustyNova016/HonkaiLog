import {Account, CallbacksOptions, Profile} from "next-auth";

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