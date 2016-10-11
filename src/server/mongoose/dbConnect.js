import mongoose from 'mongoose';
const mongoUri = process.env.MONGODB_URI || 'mongodb://heroku_xhv7f19z:6bcii1ertp6ehkf7u9gfsmue44@ds053216.mlab.com:53216/heroku_xhv7f19z'
mongoose.connect(mongoUri);
const db = mongoose.connection;

console.log('MONGO_URI: ', mongoUri);
console.log('PORT: ', process.env.PORT);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('And we\'re in!!!');
});

export default db;
