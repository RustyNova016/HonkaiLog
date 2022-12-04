/** Initialize the database models */
import Material from "./material";
import Material_logs from "./material_logs";
import sequelize from "../tools/Database/SequelizeConnection";
import {associateUser} from "./user";


export const database = {
    Material,
    Material_log: Material_logs,
    User: sequelize.models.user,
}

associateUser(database);

Object.values(database).forEach((model: any) => {
    if (model.associate) {
        model.associate(database);
    }
});

//addLegacyData()
//sequelize.sync({alter: true});

export default database;
