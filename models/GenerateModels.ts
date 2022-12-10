import {
	IConfig, ModelBuilder, DialectMySQL 
} from 'sequelize-typescript-generator';

// stg -D mysql -d honkailog_dev -u root -x -h localhost -p 3306 -a ./models/associations.csv -o ./models --indices

(async () => {

	const config: IConfig = {
		connection: {
			dialect: 'mysql',
			host: 'localhost',
			database: 'honkailog_dev_ts_test',
			username: 'root',
			password: ''
		},
		metadata: {
			indices: true,
			case: 'CAMEL',
		},
		output: {
			clean: true,
			outDir: 'models'
		},
		strict: true,
	};

	const dialect = new DialectMySQL();

	const builder = new ModelBuilder(config, dialect);

	try {

		await builder.build();
	
	}
	catch(err) {

		console.error(err);
		process.exit(1);
	
	}

})();