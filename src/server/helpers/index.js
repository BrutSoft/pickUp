import moment from 'moment';
import crypto from 'crypto';
import phone from 'phone';
import geolib from 'geolib';

const helpers = {
  createGameTime: (reqTime) => {
    // works for TODAY
    let gameTime = new Date(
      moment().get('year'),
      moment().get('month'),
      moment().get('date'),
      parseInt(reqTime)
    );
    return gameTime;
  },
  // using === instead of >= to avoid multiple texts
  // put texted flag on each player
  hasEnoughPlayers: game => game.playRequests === game.minPlayers,

  includesPlayer: (game, smsNum) => game.smsNums.reduce((included, smsObj) => {
    smsNum = helpers.phone(smsNum);
    console.log('smsNum = ', smsNum)
    return smsObj.smsNum === smsNum || included;
  }, false),

  forEachPlayer: (game, cb) => {
    game.smsNums.forEach(smsObj => {
      cb(smsObj.smsNum);
    });
  },

  phone: num => phone(num)[0],

  isInRange: (location, center, radius) => {
    return (geolib.getDistance(location, center) < radius)
  },

  getNewCenterLoc: smsNums => {
    console.log('smsNums', smsNums);
    let locations = smsNums.map(smsNum => smsNum.location);
    console.log('locations', locations)
    return geolib.getCenter(locations);
  },

};

export default helpers;
