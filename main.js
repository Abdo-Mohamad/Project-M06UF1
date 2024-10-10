/* 
    Zombie RPG:
    In Zombie RPG, you explore an X x X board full of zombies and rewards.
    You start at [0, 0] and collect coins with each move. If you find a zombie, 
    your coins are halved; if you find a reward, they multiply. Move only North,
    South, East, or West and avoid already visited squares. The game ends if you 
    run out of moves or reach [X-1, X-1]. Survive!
*/

// VARIABLES
let dimension = 4; // Size of the matrix (for example, 4x4)

let matrix;

// coding
matrix = createSquareMatrix(dimension);
createRandomZombie(matrix);
createRandomRewards(matrix);
showTable(matrix);

// functions
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
  console.log(matrix, "this is the matrix");

  let randomRow = Math.floor(Math.random() * matrix.length); // Generate a random row
  let randomCol = Math.floor(Math.random() * matrix[0].length); // Generate a random column

  let zombieCounter = 0; // Fixed spelling error from 'Cunter' to 'Counter'
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
  // return matrix; // If you want to return the updated matrix
}

function createRandomRewards(matrix) {
  let rewardsNumber = Math.round(matrix.length / 4); 
  let rewardsCounter = 0; // Fixed spelling error from 'zombiereWards' to 'rewardsCounter'

  while (rewardsCounter < rewardsNumber) {
    let randomRow = Math.floor(Math.random() * matrix.length); // Generate a random row
    let randomCol = Math.floor(Math.random() * matrix[0].length); // Generate a random column

    while (
      (randomRow === 0 && randomCol === 0) || // Avoid [0][0]
      (randomRow === matrix.length - 1 && randomCol === matrix[0].length - 1) ||
      matrix[randomRow][randomCol] === 2 || matrix[randomRow][randomCol] === 3
    ) {
      randomRow = Math.floor(Math.random() * matrix.length); // New random row
      randomCol = Math.floor(Math.random() * matrix[0].length); // New random column
    }

    matrix[randomRow][randomCol] = 3; // Assign the reward
    rewardsCounter++;
  }

  return matrix; // Return the updated matrix
}

function showTable(matrix) {
  let displayStr = "";
  for (let i = 0; i < matrix.length; i++) {
    displayStr += matrix[i].join(" ") + "\n"; // Join the elements of each row with a space and add a newline
  }
  console.log(displayStr);
}
