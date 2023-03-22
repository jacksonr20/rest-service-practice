import express from 'express';
import { dbConnection } from '../database/config.js';
import { router } from '../routes/users.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT || 3000;
    this.usersPath = '/api/users';

    //DB Connection
    this.connectToDatabase().then(() => {
      // Middlewares
      this.middlewares();

      // Routes
      this.routes();
    });
  }

  async connectToDatabase() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.usersPath, router);
  }

  listen() {
    this.app.listen(process.env.APP_PORT, () => {
      console.log('Running on port:', this.port);
    });
  }
}

export { Server };
