import express from 'express';

export class RouterSingleton {
  private static instance: express.Router;

  public static getInstance(): express.Router {
    if (!RouterSingleton.instance) {
      RouterSingleton.instance = express.Router();
    }
    return RouterSingleton.instance;
  }
}
