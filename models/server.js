import express from 'express';

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.APP_PORT || 3000;

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.get('/api', (req, res) => {
      res.send('Hello World');
    });
  }

  listen() {
    this.app.listen(process.env.APP_PORT, () => {
      console.log('Running on port:', this.port);
    });
  }
}

export { Server };
