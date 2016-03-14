import { install } from 'source-map-support';
install();

import 'babel-polyfill';
import fs from 'fs';
import five from 'johnny-five';
import twitter from 'node-twitter';
import { removeDiacritics } from './tools';

const config = JSON.parse(fs.readFileSync('./twitter-access.json', 'utf8'));
const board = new five.Board();
const twitterRestClient = new twitter.RestClient(
        config.CONSUMER_KEY,
        config.CONSUMER_SECRET,
        config.ACCESS_TOKEN,
        config.ACCESS_TOKEN_SECRET
      );

board.on('ready', function tweeter() {
  const arduino = this;
  const lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 16
    // Options:
    // bitMode: 4 or 8, defaults to 4
    // lines: number of lines, defaults to 2
    // dots: matrix dimensions, defaults to "5x8"
  });

  function displayTweet() {
    twitterRestClient.statusesHomeTimeline({ count: 1 }, (error, result) => {
      if (error) {
        lcd.clear().cursor(0, 0).print('Error:');
        lcd.cursor(1, 0).print(error.code ? `${error.code} ${error.message}` : error.message);
      }

      if (result) {
        lcd.clear().cursor(0, 0).print(removeDiacritics(result[0].text.substring(0, 16)));
        lcd.cursor(1, 0).print(removeDiacritics(result[0].text.substring(16, 32)));
      }

      arduino.repl.inject({ lcd });
    });
  }

  displayTweet();
  setInterval(displayTweet, 60000);
});
