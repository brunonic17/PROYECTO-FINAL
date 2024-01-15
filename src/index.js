import { app } from "../src/app.js";
import { configEnv } from "../config.js";
import { connectDb } from "./db.js";


try {

    connectDb()

    app.listen(
        configEnv.appPort.port, () => {
      console.log(`Servidor corriendo en port: ${configEnv.appPort.port}`);
    });
    
} catch (error) {
    console.log(`ERROR al inicializar backend: ${err.message}`)
}