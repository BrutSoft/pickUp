import mongoose from 'mongoose';
const mongoUri = process.env.MONGO_URI || 'mongodb://heroku_788ch296:isv4ga63gmt8jits1puogl30cb@ds035816.mlab.com:35816/heroku_788ch296';
mongoose.connect(mongoUri);
const db = mongoose.connection;

console.log('MONGO_URI: ', mongoUri);
console.log('PORT: ', process.env.PORT);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('And we\'re in!!!');
});

export default db;
