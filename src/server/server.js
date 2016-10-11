import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import gameController from './games/gameController';
import db from './mongoose/dbConnect';
import passport from 'passport';
var localStrategy = require('passport-local').Strategy;

const app = express();
let clientDir = path.join(__dirname, '../../src/client')

// Force HTTPS on Heroku
 if (app.get('env') === 'production') {
   app.use(function(req, res, next) {
     var protocol = req.get('x-forwarded-proto');
       protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
   });
 }
 // CORS
 app.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', "*");
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
   res.header('Access-Control-Allow-Headers', 'Content-Type');
   next();
 });

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(clientDir));

app.post('/api/games', gameController.addRequest)
console.log(`client directory: ${clientDir}`)


// Auth =======================================================================
import User from './mongoose/models/users';
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new localStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.post('/register', function(req, res) {
  User.register(new User({ username: req.body.username, password: req.body.password }),
    req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(err, user, info);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      console.log('req.logIn', err)
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

// ============================================================================

export default app;

/**

                                                 ..
                                                .,,  ...
                                                ...  .~~,.
                                                     .~~,.
                                         ..,..:::. ,,,... .~~,.
                                        ......,,,. ...,,.......
                                             .,,,.   .,,..
                                      ..,. .,,. .,,  ..
                                      .::. ...,,,..  .... .,,..
                                      .==.   .~=~.   .,,. .~~..
                                   ......,.. ..,,. :::..:==...
                                   ....  ,.,..,,,. :::  ,==
                                      .,,===..~=~  ...,,...
                                   ......,::,,,:,. ......
                                   ....    .:~.    ,,,.
                                .=8D...==. .,,. .,,....
                              ...=DD...==. .,,. .,,
                               888OOII?.
                           ..88OOZII===DD.
                       ......DDOO$II===88.
                       =88888OOII?==D88.
               .88888888OOOOOII==I88.....77777777.                        777
               .88888888OOOOOII==I8D.   .I7777777                         777
             78DOOOOOOOOOOIIIII887. .   ....77:..77                       777
          .==7ZZ$$$OOOOOZZIII??887         .77: .77                    .::777::
           887????+OOOOZIIIII==887         .77: .77                   .:7777777
        =DD++???=====8OZII===88...         .77I77..  .77777  +7I  .77.....777..
     ...=88?????=====OO$II===88.           .77777..  .77777  +7I  .77..   777
     .888OO??======::::~=====88.           .77: .77  .77+.   +7I  .77..   777
   ===88OOO77+==~~~:::::~~===88.           .77: .77  .77+.   +77:::++..   777
   888OOOOOOO?==:::::,,,,,===88.           .77: .77  .77+.   +77777       777
.88OOOOOOOOOOOOO:::,,,,,,,D88           .I7777777
..D8OOOOOOOOOOOOO:::,,,,,,,8D8           .I7777777.
88OOOOOOOOOOOO7IIII?,,,,+88
OOOOOOOOOOOOIIIII=====887...                .77777.                .77..   I7I
OOOOOOOOOOOOIIIII=====D87                ....77777.             ....77..   777
88OOOOOOOZIIII+=====88..                 .I77.                 ..777       777
==88OOO777II++===ZZZ==.                  .I77.        .++~.    ..777   .,++I77++
.88OOOIIIII=====888                     .I77. .    ...77+..  ...777....:7777777
   88DII?====Z88                           .77:    777  ~77  +7777777..   777
   DDDII?====ZD8                           .77:... 777  ~77  +7777777..   777
     .88Z==88=.                              .+77  777  ~77   ..777       777
     .==?ZZ==.                               .+77  :::++=::   ..777       777
        =8D                             ......+77.   .77+.    ..77I       777
                                        .I7777:
                                        .I7777:
 */
