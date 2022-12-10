import { Sequelize } from 'sequelize-typescript';
import * as db from "./index";

//TODO: Put Env Variables
const sequelize = new Sequelize({
	database: 'honkailog_dev_ts_test',
	dialect: 'mysql',
	username: 'root',
	password: '',
	host: 'localhost',
	models: [db.material, db.user, db.material_logs]
});

export default sequelize
