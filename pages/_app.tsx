import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import 'reflect-metadata';
import '../styles/SCSS/globals.scss'

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <SessionProvider>
            <Component {...pageProps} />
        </SessionProvider>
    </>
}

export default MyApp
