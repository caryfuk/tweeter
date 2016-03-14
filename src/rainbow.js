const five = require('johnny-five');
const board = new five.Board();

function toHex(d) {
  return `0${(Number(d).toString(16))}`.slice(-2).toUpperCase();
}

board.on('ready', function rainbow() {
  const rgb = new five.Led.RGB([6, 5, 3]);
  const frequency = 0.05;
  let index = 0;
  function createColorGenerator(shift) {
    return () => toHex(Math.round(Math.sin(frequency * index + shift) * 127 + 128));
  }
  const red = createColorGenerator(0);
  const green = createColorGenerator(2);
  const blue = createColorGenerator(4);

  this.loop(10, () => {
    console.log(`${red()} ${green()} ${blue()}`);
    rgb.color(red + green + blue);
    index++;
  });
});
