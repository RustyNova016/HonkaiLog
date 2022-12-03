import GitHubProvider from "next-auth/providers/github";
import {Account, CallbacksOptions, Profile} from "next-auth";
import {Provider} from "next-auth/providers";

function testClientID(){
    const id = process.env.GITHUB_CLIENT_ID;
    console.info("process.env: ", process.env);
    console.info("Client Id: ", id);
    return id
}

/** List of credentials to connect to different auth providers
 *  /!\ Check the .env.local file to insert the s ensitive codes /!\
 */
export const AuthProviders: Provider[] = [
    GitHubProvider({
        clientId: testClientID(),
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
];

/** Callbacks after the user logged in.
 *
 */
export const AuthCallbacks: Partial<CallbacksOptions<Profile, Account>> = {
    session: async ({session, token}) => {
        // Put the user id into the user object
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