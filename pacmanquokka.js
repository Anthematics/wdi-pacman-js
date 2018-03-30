/* eslint no-console: 0 */ // --> OFF
/* eslint prefer-destructuring: 0 */ // --> OFF
/* eslint no-restricted-syntax: 0 */ // --> OFF
/* eslint no-param-reassign: 0 */ // --> OFF
/* eslint no-unused-expressions: 0 */ // --> OFF
const ghosts = [];
// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;
let dots = 240;

const ghostsLeft = ghosts.length;
// Define your ghosts here

const Inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  charactor: 'Shadow',
  edible: false,
};

const Blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  charactor: 'Speedy',
  edible: false,

};

const Pinky = {
  menu_option: '3',
  name: 'Pinky',
  color: 'Pink',
  charactor: 'Bashful',
  edible: false,
};

const Clyde = {
  menu_option: '4',
  name: 'Clyde',
  color: 'Orange',
  charactor: 'Pokey',
  edible: false,
};

ghosts.push(Inky, Blinky, Pinky, Clyde);

function displayStats() {
  console.log(`Score: ${score}
  Lives: ${lives}
  PowerPellets: ${powerPellets}
  GhostsLeft: ${ghostsLeft}
  Dots: ${dots}
  `);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n'); // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(m) Munch on a powerpellet');
  console.log('(e) Eat Ten Dots ');
  console.log('(r) Eat Remaining Dots');
  console.log('(q) Quit');
  console.log(`(1) Eat Inky ${Inky.edible}`);
  console.log(`(2) Eat Blinky ${Blinky.edible}`);
  console.log(`(3) Eat Pinky ${Pinky.edible}`);
  console.log(`(4) Eat Clyde ${Clyde.edible}`);
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

function clearScreen() {
  console.log('\x1Bc');
}
// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dots -= 1;
}

function eatTenDots() {
  console.log('\nTENCHOMP');
  score += 100;
  dots -= 10;
}

function eatRemainingDots() {
  console.log('ALL CHOMP');
  score = dots * 10;
  dots = 0;
  nextLevel();
}

// create a function that does not allow dots to fall into
// negatives or removes the command once the condition for it
// is no longer met maybe a function called (checkDots?).

function nextLevel() {
  if (dots === 0 && powerPellets === 0) {
    level += 1;
  }
}


function gameOver() {
  if (lives < 0) {
    process.exit();
  }
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1;
    console.log(`   ${ghost.name} ate Pac-man, bad ${ghost.name}`);
    gameOver();
  } else {
    console.log(` You have eaten${ghost.name}CHOMP`);
    score += 200;
    ghost.edible = false;
  }
}

function eatPellet() {
  if (powerPellets > 0) {
    powerPellets -= 1;
    for (const ghost of ghosts) {
      ghost.edible = true;
    }
  } else {
    console.log('NO SOUP FOR YOU');
  }
}

// Process Player's Input
// can also try eatGhost(ghosts[0]); etc

function processInput(key) {
  switch (key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'e':
      eatTenDots();
      break;
    case 'r':
      eatRemainingDots();
      break;
    case '1':
      eatGhost(Inky);
      break;
    case '2':
      eatGhost(Blinky);
      break;
    case '3':
      eatGhost(Pinky);
      break;
    case '4':
      eatGhost(Clyde);
      break;
    case 'm':
      eatPellet();
      break;
      // wtf weird syntax highlight
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300);
  // The command prompt will flash a message for 300 milliseoncds before it re-draws
  // the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
