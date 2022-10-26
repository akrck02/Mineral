import mongoose from "mongoose";

const db_connection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${conn.connection.host}:${conn.connection.port}`;
        console.info(`MongoDB connected at ${url}`);
    }
    catch(error) {
        console.error(`${error.message}`);
        process.exit(1);
    }
}

export default db_connection;