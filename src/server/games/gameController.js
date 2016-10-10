import sms from '../twilio/sms';
import Game from './gameModel';
import db from '../mongoose/db';
import helpers from '../helpers';
import moment from 'moment';

export default {
  addRequest: (req, res, next) => {
    let gameReq = req.body;
    console.log(gameReq);
    let smsNum = helpers.phone(gameReq.smsNum);
    if (!smsNum) {
      return res.send(400);
    }

    let newGame = new Game({
      sport: gameReq.sport,
      startTime: gameReq.time,
      minPlayers: helpers.minPlayers[gameReq.sport],
      playRequests: 1,
      locCenter: {
        latitude: gameReq.location.latitude,
        longitude: gameReq.location.longitude,
      },
      smsNums: [{
        smsNum: smsNum,
        location: {
          latitude: gameReq.location.latitude,
          longitude: gameReq.location.longitude,
        }
      }],
    });
    // check if game exists in DB
    db.getGame(newGame)
      .then(foundGame => {
        if (foundGame) {
          console.log('game found ');

          if ( helpers.includesPlayer(foundGame, gameReq.smsNum) ) {
            console.error('game already requested.');
            return Promise.resolve(foundGame);
          }

          // if user location within radius of game center
          if (helpers.isInRange(gameReq.location, foundGame.locCenter, 10)) {

            foundGame.smsNums.push({smsNum: gameReq.smsNum, location: gameReq.location});
            foundGame.playRequests += 1
            // caluclate new game center
            foundGame.locCenter = helpers.getNewCenterLoc(foundGame.smsNums);
            return Promise.resolve(foundGame);
          } else {
            console.log('game not found in range. using newGame');
            return Promise.resolve(newGame);
          }

        } else {
          console.log('game not found in db. using newGame ');
          return Promise.resolve(newGame);
        }
      })
      .then(game => {
        // check if playRequest > minPlayer
        console.log('player Count: ', game.playRequests);
        if (helpers.hasEnoughPlayers(game)) {
          // send to all the players
          helpers.forEachPlayer(game, (num) => {
            console.log('texting ', num);
            sms.sendScheduledGame({
              smsNum: num,
              sport: gameReq.sport,
              gameLoc: 'Stallings',
              gameTime: gameReq.time
            });
          })
        }
        return Promise.resolve(game);
      })
      .then(db.saveGame)
      .then((savedGame) => {
        res.status(201).json(savedGame);
      })
      .catch(err => {
        console.error('error saving game ', err)
        res.status(500).send('error requesting game');
      });


  }
}
