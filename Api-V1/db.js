const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return mongoose.connect('mongodb://alberto:garciaVilla87@cluster0-shard-00-00-ttdek.mongodb.net:27017/portafolio?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')
    .then(db => { 
      isConnected = db.connections[0].readyState;
    });
};