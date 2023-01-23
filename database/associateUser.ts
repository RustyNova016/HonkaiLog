import database from "./database";
import sequelize from "../tools/Database/SequelizeConnection";

export function associateUser(models: typeof database) {
    sequelize.models.user.hasMany(models.Material_logs, {
        foreignKey: 'userId'
    });
}