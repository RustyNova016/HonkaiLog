import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react";
import 'reflect-metadata';
import '../styles/SCSS/globals.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

function MyApp({Component, pageProps}: AppProps) {
    return <>
        <SessionProvider>
            <Component {...pageProps} />
        </SessionProvider>
    </>
}

export default MyApp
