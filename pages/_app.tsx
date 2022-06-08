import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import SWRDevtools from "@jjordy/swr-devtools";

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <SWRDevtools>
            <SessionProvider>
                <Component {...pageProps} />
            </SessionProvider>
        </SWRDevtools>
    </>
}

export default MyApp
