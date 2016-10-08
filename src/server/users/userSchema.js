import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
  smsNum: 'string',
  location: {
    latitude: 'Number',
    longitude: 'Number',
  },
});

export default userSchema;
