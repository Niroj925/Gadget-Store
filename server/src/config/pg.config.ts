import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();

const port=parseInt(process.env.PG_PORT)

const databaseConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.PG_HOST,
    port:port,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: true,
    logging: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // ssl: {
    //     rejectUnauthorized: false
    // },
    extra: {
        "options": "-c timezone=UTC"
    }
};

export default databaseConfig;  