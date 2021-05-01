import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import generateSchema from './graphql';

class App {
  private _app: express.Application;

  constructor() {
    this._app = express();

    this._apolloServerSetup();
  }

  private async _apolloServerSetup() {
    const schema = await generateSchema();

    const server = new ApolloServer({ schema });

    server.applyMiddleware({ app: this._app });

    return server;
  }

  public listen() {
    const { PORT = String(5000) } = process.env;

    this._app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

const app = new App();

export default app;
