import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: "Username", type: "text", placeholder: "Username"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                //todo: Hash password before sending to database
                const res = await axios.post(`http://localhost:3000/api/user/login`, credentials);

                if (res) {
                    console.log(res.data);
                    return res.data;
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt: ({token, user}) => {
            // first time jwt callback is run, user object is available
            if (user) {
                token.id = user.id;
            }

            return token;
        },
        session: ({session, token}) => {
            if (token) {
                session.id = token.id;
            }

            return session;
        },
    },
    secret: "test",
    jwt: {
        secret: "test",
    },
});