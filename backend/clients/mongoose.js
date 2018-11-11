import mongoose from 'mongoose';

const host = 'mongodb';
const port = 27017;
const database = 'bands';
const mongodb = `mongodb://${host}:${port}/${database}`;

class MongoDB {
  constructor() {
    mongoose.connect(
      mongodb,
      { useNewUrlParser: true },
    );
    mongoose.Promise = global.Promise; // look this up

    const client = mongoose.connection;

    client.on('open', () => {
      console.log(':: MongoDB client connected with ' + mongodb);
    });

    client.on('error', err => {
      console.log(':: Something went wrong ' + err);
    });

    return client;
  }
}

module.exports = new MongoDB();
