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
export const salt = 10 ;

export const tokenSecret =  process.env.TOKEN_SECRET;

export const TokenMercadoPago = process.env.MERCADOPAGO_ACCESS_TOKEN