import dotenv from "dotenv"

dotenv.config()


   export const configEnv = {
    appPort : {
        port : process.env.APP_PORT, 
    },
    dbConfig: {
        host : process.env.DB_MONGODB,
    },
    salt: process.env.BCRYPT_SALT,
    tokenSecret: process.env.TOKEN_SECRET
}