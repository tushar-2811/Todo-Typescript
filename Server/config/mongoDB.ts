import mongoose from "mongoose";

const URI =  "mongodb+srv://tusharrawat52:lSyJk6ZrkfesyxpL@cluster0.tz8zdjw.mongodb.net/Todo-TS"

const ConnectToDatabase = async () => {
      
    try {
        if(!URI) {
            console.log(`error in fetching URI`);
            return;
        }
        const db = await mongoose.connect(URI);
        console.log(`Connected to mongoDB ::`);
        
    } catch (error) {
        console.log(`error in connecting to DB : ${error}`);
    }

}


ConnectToDatabase();