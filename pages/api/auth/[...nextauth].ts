import NextAuth from "next-auth"
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import sequelize from "../../../tools/Database/SequelizeConnection";
import {AuthCallbacks, AuthProviders} from "../../../tools/NextAuth/tools";


export default NextAuth({
    providers: AuthProviders,
    callbacks: AuthCallbacks,
    secret: "test",
    jwt: {
        secret: "test",
    },
    adapter: SequelizeAdapter(sequelize),
});