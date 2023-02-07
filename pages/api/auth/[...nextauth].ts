import NextAuth from "next-auth"
import {authOptions} from "@/lib/NextAuth/AuthOptions";


export default NextAuth(authOptions);