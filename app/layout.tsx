import 'server-only'
import './globals.css'
import styles from "./layout.module.scss";
import {Navbar} from "../components/layout/navbar/Navbar";
import {Background} from "../components/layout/background/background";
import createClient from '../utils/supabase-server'
import SupabaseListener from "../components/supabase-listener";

export default async function RootLayout({children,}: { children: React.ReactNode }) {
    const supabase = createClient()

    const {
        data: {session},
    } = await supabase.auth.getSession()

    return (
        <html className={styles.mainFont} lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
        */}
        <head/>
        <body className={styles.mainBody}>
        <SupabaseListener accessToken={session?.access_token}/>
        <Background>
            <Navbar/>
            {children}
        </Background>
        </body>
        </html>
    )
}

export const revalidate = 0
