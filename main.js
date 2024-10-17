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
let matrix; //

let playerPosition = [0, 0]; // Posición inicial del jugador
let visited = new Set(); // Lugares visitados (usamos Set para evitar repeticiones)
visited.add("0,0"); // Marcamos la posición inicial como visitada
//let coins = 10; // Monedas iniciales

// Definimos las direcciones de movimiento
const directions = {
  North: [-1, 0], // Mover hacia arriba
  South: [1, 0], // Mover hacia abajo
  East: [0, 1], // Mover hacia la derecha
  West: [0, -1], // Mover hacia la izquierda
};

// coding
matrix = createSquareMatrix(dimension);
createRandomZombie(matrix);
createRandomRewards(matrix);
//move(directions);
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
  //console.log(matrix, "this is the matrix");

  let randomRow = Math.floor(Math.random() * matrix.length); // Generate a random row
  let randomCol = Math.floor(Math.random() * matrix[0].length); // Generate a random column

  let zombieCounter = 0; //  Initialize the counter for zombies

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
  //return matrix; // If you want to return the updated matrix
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
      matrix[randomRow][randomCol] === 2 ||
      matrix[randomRow][randomCol] === 3
    ) {
      randomRow = Math.floor(Math.random() * matrix.length); // New random row
      randomCol = Math.floor(Math.random() * matrix[0].length); // New random column
    }

    matrix[randomRow][randomCol] = 3; // Assign the reward
    rewardsCounter++; //
  }

  //return matrix; // Return the updated matrix
}

function showTable(matrix) {
  let displayStr = "";
  for (let i = 0; i < matrix.length; i++) {
    displayStr += matrix[i].join(" ") + "\n"; // Join the elements of each row with a space and add a newline
  }
  console.log(displayStr);
}

// Mover al jugador en una dirección (North, South, East, West)
function move(direction) {
  // console.log(direction);

  // Verificar si la dirección es válida
  if (directions[direction] === undefined) {
    console.log("Dirección inválida. Usa 'North', 'South', 'East' o 'West'."); // si la dirección es igual a unos  de los valores de la variable directions salta  a la siguiente instrucción
  } else {
    let [currentRow, currentCol] = playerPosition; // Posición actual del jugador
    console.log([currentRow, currentCol] + " - Posición actual");
    let [rowChange, colChange] = directions[direction]; // Dirección de movimiento 

    // Nueva posición después del movimiento
    let newRow = currentRow + rowChange; // asignar  el valor de rowChange a newRow

    let newCol = currentCol + colChange; //  asignar  el valor de colChange a newCol


    // Verificar límites del tablero
    if (newRow < 0 || newRow > dimension || newCol < 0 || newCol > dimension) {
      console.log("¡No puedes moverte fuera del tablero!"); // si  la nueva posición es menor a 0 o mayor a dimension salta a la siguiente instrucción 

    } else {
      // Verificar si ya se visitó esa casilla
      if (visited.has(`${newRow},${newCol}`)) {
        console.log("¡Ya visitaste esta casilla!"); // si  la nueva posición ya se ha visitado salta a la siguiente instrucción

      } else {
        // Actualizar la posición del jugador
        playerPosition = [newRow, newCol];
        visited.add(`${newRow},${newCol}`);
        matrix[currentRow][currentCol] = 1;
      }
    }
  }
}

/* North: [-1, 0], // Mover hacia arriba
South: [1, 0], // Mover hacia abajo
East: [0, 1], // Mover hacia la derecha
West: [0, -1], // Mover hacia la izquierda */
//showTable(matrix);
