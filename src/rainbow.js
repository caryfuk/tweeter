const five = require('johnny-five');
const board = new five.Board();

function toHex(d) {
  return `0${(Number(d).toString(16))}`.slice(-2).toUpperCase();
}

board.on('ready', () => {
  const rgb = new five.Led.RGB([6, 5, 3]);
  const frequency = 0.05;
  let index = 0;
  const red = toHex(Math.round(Math.sin(frequency * index + 0) * 127 + 128));
  const green = toHex(Math.round(Math.sin(frequency * index + 2) * 127 + 128));
  const blue = toHex(Math.round(Math.sin(frequency * index + 4) * 127 + 128));

  this.loop(10, () => {
    console.log(`${red} ${green} ${blue}`);
    rgb.color(red + green + blue);
    index++;
  });
});
