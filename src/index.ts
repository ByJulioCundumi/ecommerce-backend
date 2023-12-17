import app from "./server.js";
import { PORT, HOST, ADMIN_FIRSTNAME, ADMIN_LASTNAME, ADMIN_EMAIL, ADMIN_PASSWORD } from "./config/config.js";
import { AppDataSource } from "./db/dataSource.js";
import { User } from "./entity/User.js";
import bcrypt from "bcryptjs"

const main = async ()=>{
    app.listen(PORT, HOST, ()=>{console.log(`Server started on http:${HOST}:${PORT}`)})
    console.log(ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_FIRSTNAME)
    try {
        await AppDataSource.initialize();
        //
        createAdmin()
        //
    } catch (error) {
        console.log(error)
    }
}
main()

const createAdmin = async()=>{
    
    try {
        const result = await User.findOneBy({email:ADMIN_EMAIL});
        if(!result?.id){
            const admin = new User()
            admin.firstname = ADMIN_FIRSTNAME;
            admin.lastname = ADMIN_LASTNAME;
            admin.email = ADMIN_EMAIL;
            admin.password = await bcrypt.hash(ADMIN_PASSWORD,10);
            admin.role = "admin";
            //
            await admin.save()
        }else {
            return;
        }
        //
    } catch (error) {
        console.log(error)
    }
}
