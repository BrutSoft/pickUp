import mongoose from 'mongoose';
import userSchema from '../users/userSchema';

const gameSchema = mongoose.Schema({
  sport: 'string',
  startTime: { type: Date },
  minPlayers: 'Number',
  playRequests: 'Number',
  locCenter: {
    latitude: 'Number',
    longitude: 'Number',
  },
  smsNums: [userSchema]
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
