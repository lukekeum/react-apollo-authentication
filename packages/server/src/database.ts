import { PrismaClient } from '@prisma/client';

class Database {
  private _client: PrismaClient;

  constructor() {
    this._client = new PrismaClient();
  }

  get client(): PrismaClient {
    return this._client;
  }
}

const database = new Database();

export default database;
