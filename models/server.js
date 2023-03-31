import express from 'express';
import { dbConnection } from '../database/config.js';
import { userRouter, authRouter } from '../routes/index.js';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT || 3000;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

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
    this.app.use(this.usersPath, userRouter);
    this.app.use(this.authPath, authRouter);
  }

  listen() {
    this.app.listen(process.env.APP_PORT, () => {
      console.log('Running on port:', this.port);
    });
  }
}

export { Server };
