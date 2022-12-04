'use client'
import { SessionProvider } from "next-auth/react";

// https://github.com/nextauthjs/next-auth/discussions/5766
export default function AuthProvider ({ children, session }: any) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}