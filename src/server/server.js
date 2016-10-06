import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import gameController from './games/gameController';
import db from './mongoose/dbConnect';

const app = express();
let clientDir = path.join(__dirname, '../../src/client')

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(clientDir));

app.post('/api/games', gameController.addRequest)
console.log(`client directory: ${clientDir}`)

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
