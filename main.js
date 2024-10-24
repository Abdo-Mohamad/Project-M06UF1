/* 
    Zombie RPG:
    In Zombie RPG, you explore an X x X board full of zombies and rewards.
    You start at [0, 0] and collect coins with each move. If you find a zombie, 
    your coins are halved; if you find a reward, they multiply. Move only North,
    South, East, or West and avoid already visited squares. The game ends if you 
    run out of moves or reach [X-1, X-1]. Survive!
*/

// VARIABLES

let dimension; 

do {
  let input = prompt("Introduce la dimensión del tablero (un número entero entre 4 y 14):");
  
  // Si el usuario cancela, salimos del ciclo
  if (input === null) {
    console.log("El usuario canceló.");
    break;
  }

  dimension = parseInt(input);

  // Si la entrada no es válida, se repetirá el ciclo
} while (isNaN(dimension) || dimension < 4 || dimension > 14);
let matrix; //

let playerPosition = [0, 0]; // Posición inicial del jugador
let visited = new Set(); // Lugares visitados (usamos Set para evitar repeticiones)
visited.add("0,0"); // Marcamos la posición inicial como visitada
let promptWherToMove; // preguntar por donde mover se
let pocitionValida = []; //
let movimentos = 0; // Número de movimientos realizados
let coins = 0; // Monedas iniciales

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
  return matrix;
}

/* // Mover al jugador en una dirección (North, South, East, West)
function move(direction) {
  // Posición actual del jugador
  let [currentRow, currentCol] = playerPosition;
  let movimientoPosible = false;

  // Verificar si la dirección proporcionada es válida
  if (directions[direction] === undefined) {
    console.log("Dirección inválida. Usa 'North', 'South', 'East' o 'West'.");
  } else {
    // Calcular la nueva posición en base a la dirección dada
    let [rowChange, colChange] = directions[direction];
    let newRow = currentRow + rowChange;
    let newCol = currentCol + colChange;

    // Verificar si la nueva posición está dentro de los límites
    if (
      newRow >= 0 &&
      newRow < dimension &&
      newCol >= 0 &&
      newCol < dimension
    ) {
      // Verificar si ya se visitó esa casilla
      if (!visited.has(`${newRow},${newCol}`)) {
        // Actualizar la posición del jugador
        playerPosition = [newRow, newCol];
        visited.add(`${newRow},${newCol}`);
        matrix[currentRow][currentCol] = 1; // Marcamos la nueva posición en la matriz
        matrix[newRow][newCol] = 1; // Marcamos la nueva posición en la matriz
        console.log(`Te has movido a la posición [${newRow}, ${newCol}]`); // Se ha movido a la una posición nueva
        alert(`Te has movido a la posición [${newRow}, ${newCol}]`);
        //console.log(playerPosition[0], playerPosition[1]); //  Se ha movido a la una posición nueva o la posicion actual

        if (
          playerPosition[0] === dimension - 1 &&
          playerPosition[1] === dimension - 1
        ) {
          console.log("has ganado");
          alert("has ganado");
        }
      } else {
        console.log("¡Ya visitaste esta casilla!");
        alert("¡Ya visitaste esta casilla!");
      }
    } else {
      console.log("No puedes moverte fuera del límite.");
    }
  }
 
}
 */
function move(direction) {
  // Posición actual del jugador
  let [currentRow, currentCol] = playerPosition;

  // Verificar si la dirección proporcionada es válida
  if (directions[direction] === undefined) {
    console.log("Dirección inválida. Usa 'North', 'South', 'East' o 'West'.");
    alert("Dirección inválida. Usa 'North', 'South', 'East' o 'West'.");
  } else {
    // Calcular la nueva posición en base a la dirección dada
    let [rowChange, colChange] = directions[direction];
    let newRow = currentRow + rowChange;
    let newCol = currentCol + colChange;

    // Verificar si la nueva posición está dentro de los límites
    if (
      newRow >= 0 &&
      newRow < dimension &&
      newCol >= 0 &&
      newCol < dimension
    ) {
      // Verificar si ya se visitó esa casilla
      if (!visited.has(`${newRow},${newCol}`)) {
        // Actualizar la posición del jugador
        playerPosition = [newRow, newCol];
        visited.add(`${newRow},${newCol}`);

        console.log(`Te has movido a la posición [${newRow}, ${newCol}]`);
        alert(`Te has movido a la posición [${newRow}, ${newCol}]`);

        if (matrix[newRow][newCol] === 2) {
          // Si hay un zombi
          console.log(
            "¡Encontraste un zombi! Tus monedas se reducen a la mitad."
          );
          movimentos = 0;
          coins = Math.floor(coins / 2);
          console.log(coins);
        } else if (matrix[newRow][newCol] === 3) {
          // Si hay una recompensa
          console.log("¡Encontraste una recompensa! Tus monedas se duplican.");
          movimentos++;
          coins += movimentos;
          coins *= 5;
          movimentos = 0;
          console.log(coins);
        } else {
          // Si es un espacio vacío
          console.log("Movimiento seguro.");
          movimentos++;
          coins += movimentos;
          console.log(coins, " coins");
          console.log(movimentos, " movimientos");
        }
        matrix[currentRow][currentCol] = 1; // Marcamos la nueva posición en la matriz
        matrix[newRow][newCol] = 1; // Marcamos la nueva posición en la matriz
        // Verificar si el jugador ha ganado
        if (
          playerPosition[0] === dimension - 1 &&
          playerPosition[1] === dimension - 1
        ) {
          console.log("¡Has ganado!");
          console.log("¡Felicidades, llegaste al final del juego!");
          alert("¡Has ganado!");
          alert(coins, "coins");
        }
      } else {
        console.log("¡Ya visitaste esta casilla!");
        alert("¡Ya visitaste esta casilla!");
      }
    } else {
      console.log("No puedes moverte fuera del límite.");
      alert("No puedes moverte fuera del límite.");
    }
  }
}

function movimientoPosible() {
  // Posición actual del jugador
  let [currentRow, currentCol] = playerPosition;
  let movimientoPosible = false;

  // Mostrar posiciones válidas
  console.log("Posiciones válidas a las que te puedes mover:");
  for (dir in directions) {
    let [rowChange, colChange] = directions[dir];
    let newRow = currentRow + rowChange;
    let newCol = currentCol + colChange;

    // Verificar si la nueva posición está dentro de los límites y no visitada
    if (
      newRow >= 0 &&
      newRow < dimension &&
      newCol >= 0 &&
      newCol < dimension &&
      !visited.has(`${newRow},${newCol}`)
    ) {
      /* console.log(`Puedes moverte hacia ${dir} a la posición [${newRow}, ${newCol}]`);
      alert(`Puedes moverte hacia ${dir} a la posición [${newRow}, ${newCol}]`); */
      pocitionValida.push(dir);
      movimientoPosible = true;
    }
  }

  // Si no se encontró ningún movimiento posible
  if (!movimientoPosible) {
    console.log("¡Final del juego! Te has quedado encerrado.");
    alert("¡Final del juego! Te has quedado encerrado.");
  }

  return movimientoPosible;
}

// Bucle principal del juego
while (
  playerPosition[0] !== dimension - 1 ||
  playerPosition[1] !== dimension - 1
) {
  if (!movimientoPosible()) {
    break; // Si no hay más movimientos posibles, salir del bucle
  }

  let promptWherToMove = prompt(
    `¿pudes mover a estes diraciones? ${pocitionValida}`
  );
  if (promptWherToMove === null) {
    break;
  }
  pocitionValida = [];

  move(promptWherToMove); // Ejecutar movimiento
  showTable(matrix); // Mostrar estado actual del tablero
}
