import dotenv from "dotenv";

dotenv.config();

export const configEnv = {
  appPort: {
    port: process.env.APP_PORT,
  },
  dbConfig: {
    host: process.env.DB_MONGODB,
  },
};
export const salt = { passwordSalt: process.env.BCRYPT_SALT };

export const tokenSecret = process.env.TOKEN_SECRET;
