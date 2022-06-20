/** Initialize the database models */
import Material from "./material";
import Material_log from "./material_log";
import sequelize from "../tools/Database/SequelizeConnection";
import SequelizeAdapter, {models} from "@next-auth/sequelize-adapter"
import {associateUser} from "./user";

export const AuthDBAdapter = SequelizeAdapter(sequelize, {
    models: {
        User: sequelize.define("user", {
            ...models.User
        })
    }
});


export const database = {
    Material,
    Material_log,
    User: sequelize.models.user,
}

associateUser(database);

Object.values(database).forEach((model: any) => {
    if (model.associate) {
        model.associate(database);
    }
});


//sequelize.sync({alter: true});

export default database;
