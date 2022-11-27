"use client";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react";
import supabase from "../../../utils/supabase-browser";
import styles from "../../variables.module.scss"

export function LoginForm() {
    return <>
        <Auth supabaseClient={supabase}
              appearance={{
                  theme: ThemeSupa,
                  variables: {
                      default: {
                          colors: {
                              brand: styles.accentColor,
                              brandAccent: styles.accentDarker,
                          },
                      },
                  },
              }}
              theme="dark"
        />
    </>;
}