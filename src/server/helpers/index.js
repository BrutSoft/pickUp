import moment from 'moment';
import crypto from 'crypto';
import phone from 'phone';
import geolib from 'geolib';
import requestPromise from 'request-promise';

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
  hasEnoughPlayers: game => game.playRequests >= game.minPlayers,

  includesPlayer: (game, smsNum) => game.smsNums.reduce((included, smsObj) => {
    smsNum = helpers.phone(smsNum);
    return smsObj.smsNum === smsNum || included;
  }, false),

  forEachPlayer: (game, cb) => {
    game.smsNums.forEach(smsObj => {
      cb(smsObj.smsNum);
    });
  },

  phone: num => phone(num)[0],

  isInRange: (location, center, radius) => {
    return (geolib.getDistance(location, center) < radius);
  },

  getNewCenterLoc: smsNums => {
    let locations = smsNums.map(smsNum => smsNum.location);
    return geolib.getCenter(locations);
  },

  getGameLoc: (locCenter) => {
    let API_KEY = process.env.PLACES_API_KEY;
    let latitude = locCenter.latitude;
    let longitude = locCenter.longitude;
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=100000&name=recreation+center&key=${API_KEY}`
    return requestPromise(url);
  },

  minPlayers: {
    soccer: 6,
    basketball: 6,
    baseball: 18,
    football: 10,
  },

};

export default helpers;
