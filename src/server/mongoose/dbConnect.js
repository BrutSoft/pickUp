import mongoose from 'mongoose';
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri);
const db = mongoose.connection;

console.log('MONGO_URI: ', mongoUri);
console.log('PORT: ', process.env.PORT);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('And we\'re in!!!');
});

export default db;
