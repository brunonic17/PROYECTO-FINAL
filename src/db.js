import mongoose from "mongoose";
import { configEnv } from "../config.js";



export const connectDb = async () => {
  try {
    await mongoose.connect(configEnv.dbConfig.host);
    console.log(`Conectada a db correctamente`);
  } catch (error) {
    console.log(`error al conectar db ${error}`);
  }
};
