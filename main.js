// VARIABLES

let dimension;

do {
  let input = prompt(
    "Enter the board dimension (an integer between 4 and 14):"
  );

  // If the user cancels, exit the loop
  if (input === null) {
    console.log("The user canceled.");
    break;
  }

  dimension = parseInt(input);

  // If the input is invalid, the loop will repeat
} while (isNaN(dimension) || dimension < 4 || dimension > 14);
let matrix;

let playerPosition = [0, 0]; // Player's starting position
let visited = new Set(); // Visited locations (using Set to avoid duplicates)
visited.add("0,0"); // Mark the initial position as visited
let promptWhereToMove; // Variable to store the player's input for movement direction
let validPositions = []; // Array for storing valid move directions
let moves = 0; // Number of moves made
let coins = 0; // Initial coin count
let zombieAround;
let rewardsAround;
let haveZombi = 0;
let haveReward = 0;

// Define movement directions
const directions = {
  north: [-1, 0], // Move up
  south: [1, 0], // Move down
  east: [0, 1], // Move right
  west: [0, -1], // Move left
};
console.log(directions);

// Coding
matrix = createSquareMatrix(dimension);
createRandomZombie(matrix);
createRandomRewards(matrix);
showTable(matrix);

// Functions

function createSquareMatrix(dim) {
  // Initialize the empty matrix
  let matrix = [];

  // Loop to create rows
  for (let i = 0; i < dim; i++) {
    // Initialize an empty row
    let row = [];

    // Loop to fill each row with zeros
    for (let j = 0; j < dim; j++) {
      row[j] = 0; // Traditional notation
    }

    // Add the row to the matrix
    matrix[i] = row; // Traditional notation
  }
  return matrix;
}

function createRandomZombie(matrix) {
  let randomRow = Math.floor(Math.random() * matrix.length); // Generate a random row
  let randomCol = Math.floor(Math.random() * matrix[0].length); // Generate a random column

  let zombieCounter = 0; // Initialize the counter for zombies

  while (zombieCounter < dimension) {
    while (
      (randomRow === 0 && randomCol === 0) || // Avoid [0][0]
      (randomRow === matrix.length - 1 && randomCol === matrix[0].length - 1) ||
      matrix[randomRow][randomCol] !== 0 // Avoid occupied positions
    ) {
      randomRow = Math.floor(Math.random() * matrix.length); // New random row
      randomCol = Math.floor(Math.random() * matrix[0].length); // New random column
    }
    zombieCounter++;
    matrix[randomRow][randomCol] = 2; // Assign a zombie
  }
}

function createRandomRewards(matrix) {
  let rewardsNumber = Math.round(matrix.length / 4);
  let rewardsCounter = 0;

  while (rewardsCounter < rewardsNumber) {
    let randomRow = Math.floor(Math.random() * matrix.length); // Generate a random row
    let randomCol = Math.floor(Math.random() * matrix[0].length); // Generate a random column

    while (
      (randomRow === 0 && randomCol === 0) || // Avoid [0][0]
      (randomRow === matrix.length - 1 && randomCol === matrix[0].length - 1) ||
      matrix[randomRow][randomCol] === 2 || // Avoid zombies
      matrix[randomRow][randomCol] === 3 // Avoid rewards
    ) {
      randomRow = Math.floor(Math.random() * matrix.length); // New random row
      randomCol = Math.floor(Math.random() * matrix[0].length); // New random column
    }

    matrix[randomRow][randomCol] = 3; // Assign the reward
    rewardsCounter++;
  }
}

function showTable(matrix) {
  let displayStr = "";
  for (let i = 0; i < matrix.length; i++) {
    displayStr += matrix[i].join(" ") + "\n"; // Join the elements of each row with a space and add a newline
  }
  console.log(displayStr);
  return matrix;
}

function move(direction) {
  // Current player position
  let [currentRow, currentCol] = playerPosition;

  // Check if the provided direction is valid
  if (directions[direction] === undefined) {
    console.log("Invalid direction. Use 'north', 'south', 'east' or 'west'.");
    alert("Invalid direction. Use 'north', 'south', 'east' or 'west'.");
  } else {
    // Calculate the new position based on the given direction
    let [rowChange, colChange] = directions[direction];
    let newRow = currentRow + rowChange;
    let newCol = currentCol + colChange;

    // Check if the new position is within bounds
    if (
      newRow >= 0 &&
      newRow < dimension &&
      newCol >= 0 &&
      newCol < dimension
    ) {
      // Check if that cell has already been visited
      if (!visited.has(`${newRow},${newCol}`)) {
        // Update the player's position
        playerPosition = [newRow, newCol];
        visited.add(`${newRow},${newCol}`);

        console.log(`You moved to position [${newRow}, ${newCol}]`);
        alert(`You moved to position [${newRow}, ${newCol}]`);

        if (matrix[newRow][newCol] === 2) {
          // If there is a zombie
          console.log("You found a zombie! Your coins are halved.");
          alert("You found a zombie! Your coins are halved.");
          moves = 0;
          coins = Math.floor(coins / 2);
          console.log(coins);
          alert(`You have ${coins}€ coins`);
        } else if (matrix[newRow][newCol] === 3) {
          // If there is a reward
          console.log("You found a reward! Your coins are doubled.");
          alert("You found a reward! Your coins are doubled.");
          moves++;
          coins += moves;
          moves = 0;
          coins *= 5;
          console.log(coins);
          alert(`You have ${coins}€ coins`);
        } else {
          // If it's an empty space
          console.log("Safe move.");
          moves++;
          coins += moves;
          console.log(coins, " coins");
          console.log(moves, " moves");
          alert(`You have ${coins}€ coins`);
        }
        alert(`the moves you make ${moves}`);
        matrix[currentRow][currentCol] = 1; // Mark the current position in the matrix
        matrix[newRow][newCol] = 1; // Mark the new position in the matrix
        // Check if the player has won
        if (
          playerPosition[0] === dimension - 1 &&
          playerPosition[1] === dimension - 1
        ) {
          console.log("You've won!");
          console.log("Congratulations, you reached the end of the game!");
          alert("You've won!");
          alert(`The coins you won ${coins}€`);
        }
      } else {
        console.log("You've already visited this cell!");
        alert("You've already visited this cell!");
      }
    } else {
      console.log("You can't move outside the limit.");
      alert("You can't move outside the limit.");
    }
  }
}

function possibleMoves() {
  // Current player position
  let [currentRow, currentCol] = playerPosition;
  let possibleMove = false;

  // Display valid positions to move
  console.log("Valid positions you can move to:");
  for (dir in directions) {
    let [rowChange, colChange] = directions[dir];
    let newRow = currentRow + rowChange;
    let newCol = currentCol + colChange;

    // Check if the new position is within bounds and not visited
    if (
      newRow >= 0 &&
      newRow < dimension &&
      newCol >= 0 &&
      newCol < dimension &&
      !visited.has(`${newRow},${newCol}`)
    ) {
      validPositions.push(dir);
      possibleMove = true;
      console.log(dir);

      //console.log(matrix[newRow][newCol] == 2 ? "zombi" : "empty");
      if (matrix[newRow][newCol] === 2) {
        haveZombi++;

        console.log(haveZombi, "this is zombi  counter");
      }
      if (matrix[newRow][newCol] === 3) {
        haveReward++;
      }
    }
    console.log(haveZombi);

    zombieAround =
      haveZombi > 0
        ? `You have a ${haveZombi} zombies around`
        : "You don't have zombies around"; // Check if there are zombies around

    rewardsAround =
      haveReward > 0
        ? `You have a ${haveReward} reward around `
        : "You don't have a reward around"; // Check if there is a reward around

  }
  haveZombi = 0; // Rest  the zombi counter
  haveReward = 0; //  Reset counters

  // If no possible moves found
  if (!possibleMove) {
    console.log("Game over! You are trapped.");
    alert("Game over! You are trapped.");
  }

  return possibleMove;
}

// Main game loop
while (
  playerPosition[0] !== dimension - 1 ||
  playerPosition[1] !== dimension - 1
) {
  if (!possibleMoves()) {
    break; // If no more possible moves, exit the loop
  }
  /* console.log( directions[validPositions[0]] , "hola" , matrix[0][1]);
/* if (); */

  let promptWhereToMove = prompt(
    `You can move to these directions: ${validPositions}\n ${zombieAround} \n ${rewardsAround} `
  );
  if (promptWhereToMove === null) {
    break;
  }
  validPositions = [];

  move(promptWhereToMove.toLowerCase()); // Execute the move
  showTable(matrix); // Show current board state
}
