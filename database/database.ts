/** Initialize the database models */
import User from "./user";
import Material from "./material";
import Material_log from "./material_log";
import sequelize from "../tools/Database/SequelizeConnection";


export interface databaseResponse {
    createdAt: Date;
    updatedAt: Date;
}

export const database = {
    Material,
    Material_log,
    User,
}

Object.values(database).forEach((model: any) => {
    if (model.associate) {
        model.associate(database);
    }
});

sequelize.sync({alter: true});

export default database;