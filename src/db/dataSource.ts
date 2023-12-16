import {DataSource} from "typeorm"
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config/config.js"
import { User } from "../entity/User.js"

export const AppDataSource = new DataSource({
    type: "mysql",
    port: DB_PORT,
    host: DB_HOST,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [User],
    synchronize: true,
    logging: true
})