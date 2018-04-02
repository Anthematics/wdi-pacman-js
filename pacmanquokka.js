/* eslint no-console: 0 */ // --> OFF
/* eslint prefer-destructuring: 0 */ // --> OFF
/* eslint no-restricted-syntax: 0 */ // --> OFF
/* eslint no-param-reassign: 0 */ // --> OFF
/* eslint no-unused-expressions: 0 */ // --> OFF
const ghosts = [];
const bonusItems = [];
let score = 0;
let lives = 2;
let powerPellets = 4
// maybe give powerpellets an edible property.
let dots = 240;
let level = 1;
let highScore = 0;
let ghostsLeft = ghosts.eaten;

// Define your ghosts here

const Inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  charactor: 'Shadow',
  edible: false,
  eaten: false,
};

const Blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  charactor: 'Speedy',
  edible: false,
  eaten: false,

};

const Pinky = {
  menu_option: '3',
  name: 'Pinky',
  color: 'Pink',
  charactor: 'Bashful',
  edible: false,
  eaten: false,
};

const Clyde = {
  menu_option: '4',
  name: 'Clyde',
  color: 'Orange',
  charactor: 'Pokey',
  edible: false,
  eaten: false,
};


// There are 256 levels. Add the appropriate fruits. Make the fruit option randomly appear in the menu
// after the player eats some dots.


// Level 1: Cherry / 100 points
// Level 2: Strawberry / 300 points
// Level 3 & 4: Orange / 500 points
// Level 5 & 6: Apple / 700 points
// Level 7 & 8: Pineapple / 1,000 points

// Define the bonus items here

const Cherry = {
  edible: false,
  score: +100,
};

const Strawberry = {
  edible: false,
  score: +300,
};

const Orange = {
  edible: false,
  score: +500,
};

const Apple = {
  edible: false,
  score: +700,
};

const Pineapple = {
  edible: false,
  score: +1000,
};

const Spaceship = {
  edible: false,
  score: +2000,
};

const Bell = {
  edible: false,
  score: +3000,
};

const Key = {
  edible: false,
  score: +5000,
};
// Level 9 & 10: Galaxian Spaceship / 2,000 points
// Level 11 & 12: Bell / 3,000 points
// Level 13+: Key / 5,000


ghosts.push(Inky, Blinky, Pinky, Clyde);
bonusItems.push(Key,Bell,Spaceship,Pineapple,Apple,Orange,Strawberry,Cherry);

function displayStats() {
  console.log(`
  Score: ${score}
  Lives: ${lives}
  PowerPellets: ${powerPellets}
  GhostsLeft: ${ghostsLeft}
  Dots: ${dots}
  Level: ${level}
  `);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n'); // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(m) Munch on a powerpellet');
  console.log('(e) Eat Ten Dots ');
  console.log('(r) Eat Remaining Dots');
  console.log('(q) Quit');
  console.log(`(1) Eat Inky edible?  ${Inky.edible} eaten? ${Inky.eaten}`);
  console.log(`(2) Eat Blinky ${Blinky.edible} eaten? ${Blinky.eaten}`);
  console.log(`(3) Eat Pinky ${Pinky.edible} eaten? ${Pinky.eaten}`);
  console.log(`(4) Eat Clyde ${Clyde.edible} eaten? ${Clyde.eaten}`);
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

function checkScore() {
  if (score >= highScore) {
    highScore = score;
  }
}

function winner() {
  if (level === 256) {
    console.log('You have Beaten Pacman');
    level = 1;
    checkScore();
  }
}

function nextLevel() {
  if (dots === 0) {
    console.log('\nLevel up!');
    level += 1;
    dots = 240;
    powerPellets = 4;
    ghostsLeft = 4;
    checkScore();
    winner();
  }
}

function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dots -= 1;
  ghosts.edible = false;
  nextLevel();
  checkScore();
}

function eatTenDots() {
  console.log('\nTENCHOMP');
  score += 100;
  dots -= 10;
  nextLevel();
  checkScore();
}

function eatRemainingDots() {
  console.log('ALL CHOMP');
  score = dots * 10;
  dots = 0;
  nextLevel();
  checkScore();
}


//  essentially we want to set a fruits edible
// property to true when a random dot between 1-240 is eaten & ensure the correct fruit
// is edible by only setting a fruit to edible when it is within the level requirements.


function randomDot() {
  Math.floor(Math.random() * 240) + 1;
}
// create a function that does not allow dots to fall into
// negatives or removes the command once the condition for it
// is no longer met maybe a function called (checkDots?).

function gameOver() {
  if (lives < 0) {
    process.exit();
  }
}

function ghostScoring() {
  console.log('called ghostScoring')
  for (const ghost of ghosts) {
    if (ghosts.eaten === 1) {
      score += 200;
      console.log('ghost 1')
    } else if (ghosts.eaten === 2) {
      score += 400;
      console.log('ghost 2')
    } else if (ghosts.eaten === 3) {
      score += 800;
      console.log('3')
    } else if (ghosts.eaten === 4) {
      score += 1600;
      console.log('4')
    }
  }
}
function eatGhost(ghost) {
  if (ghost.edible === false) {
    lives -= 1;
    console.log(`   ${ghost.name} ate Pac-man, bad ${ghost.name}`);
    gameOver();
  } else {
    console.log(` You have eaten${ghost.name}CHOMP`);
    ghost.edible = false;
    ghost.eaten = true;
    ghostScoring();
  }
}

function eatPellet() {
  if (powerPellets > 0) {
    powerPellets -= 1;
    for (const ghost of ghosts) {
      ghost.edible = true;
    }
  } else {
    console.log('There are no PowerPellets Left!!');
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

    case 'm':
      eatPellet();
      break;

    case 'w':
      eatBonusItem();
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

      // wtf weird syntax highlight
    default:
      console.log('\nInvalid Command!');
  }
}
// function score position -> check the score's position against
// others on the list and move it up based on where it belongs.
// loop through scores - if score is higher it is new
// highscore - maybe also save high score to local storage?

// create a scoreboard that saves to localstorage.


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
  setTimeout(drawScreen, 1000);
  // The command prompt will flash a message for 1 second before it re-draws
  // the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
