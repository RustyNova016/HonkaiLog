import {Sequelize} from "sequelize";

export function getSequelizeConnection() {
    let {MYSQL_HOST, MYSQL_SCHEMA, MYSQL_USER, MYSQL_PASSWORD} = process.env;
    MYSQL_HOST = MYSQL_HOST || 'localhost';
    MYSQL_SCHEMA = MYSQL_SCHEMA || 'honkailog_dev';
    MYSQL_USER = MYSQL_USER || 'root';
    MYSQL_PASSWORD = MYSQL_PASSWORD || 'root';

    console.log("Connecting to MySQL database...");

    return new Sequelize(MYSQL_SCHEMA, MYSQL_USER, undefined, {
        host: MYSQL_HOST,
        dialect: 'mysql',
        define: {
            freezeTableName: true
        },
    });
}

const sequelize = getSequelizeConnection();
export default sequelize;

export async function checkDBConnection() {
    try {
        await sequelize.authenticate();
        console.info('Connection has been established successfully.', "Database");
    } catch (error) {
        console.error('Unable to connect to the database: \n' + error, "Database");
    }
}