import express, {Application} from "express";
import userRoutes from "../routes/usuario";
import cors from "cors";

import db from "../db/connection";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online')
        } catch (e: any) {
            throw new Error(e);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors({}));

        // lectura del body
        this.app.use(express.json());

        // Carpera pública
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
}

export default Server;