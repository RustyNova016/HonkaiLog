import SequelizeAdapter, {models} from "@next-auth/sequelize-adapter";
import sequelize from "../../tools/Database/SequelizeConnection";

/** Adapter for saving users to the database
 *
 */
export const AuthDBAdapter = SequelizeAdapter(sequelize, {
    models: {
        User: sequelize.define("user", {
            ...models.User
        })
    }
});