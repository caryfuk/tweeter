var five = require("johnny-five"),
    board = new five.Board();

function toHex(d) {
  return ("0"+(Number(d).toString(16))).slice(-2).toUpperCase();
}

board.on("ready", function() {
  var rgb = new five.Led.RGB([6, 5, 3]);
  var red, green, blue;
  var index = 0
  var frequency = .05;

  this.loop(10, function() {
    red   = toHex(Math.round(Math.sin(frequency*index + 0) * 127 + 128));
    green = toHex(Math.round(Math.sin(frequency*index + 2) * 127 + 128));
    blue  = toHex(Math.round(Math.sin(frequency*index + 4) * 127 + 128));
    console.log(red + ' ' + green + ' ' + blue);
    rgb.color(red + green + blue);
    index++;
  });
});
