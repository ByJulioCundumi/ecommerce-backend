import app from "./server.js";
import { PORT, HOST } from "./config/config.js";
import { AppDataSource } from "./db/dataSource.js";

const main = async ()=>{
    app.listen(PORT, HOST, ()=>{console.log(`Server started on http:${HOST}:${PORT}`)})
    try {
        await AppDataSource.initialize();
    } catch (error) {
        console.log(error)
    }
}
main()