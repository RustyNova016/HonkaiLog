"use client";//TODO: Convert Server Component
import {signIn} from "next-auth/react";
import styles from "./CSS/Navigation.module.scss";

export function LogIn() {
    return <>
        <a
            href={`/api/auth/signin`}
            className={styles.buttonPrimary}
            onClick={(e) => {
                e.preventDefault()
                signIn()
            }}
        >
            Login
        </a>
        <a
            href={`http://localhost:3000/account/register`}
            className={styles.buttonPrimary}
            onClick={(e) => {
            }}
        >
            Register
        </a>
    </>
}


