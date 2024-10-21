// VARIABLES
let dimension = parseInt(
  prompt("Introduce la dimensión del tablero (un número entero): ")
); // Pedir al usuario la dimensión del tablero
let matrix;
let playerPosition = [0, 0]; // Posición inicial del jugador
let visited = new Set(); // Lugares visitados
let coins = 10; // Monedas iniciales
visited.add("0,0"); // Marcamos la posición inicial como visitada

// Definimos las direcciones de movimiento
const directions = {
  North: [-1, 0], // Mover hacia arriba
  South: [1, 0], // Mover hacia abajo
  East: [0, 1], // Mover hacia la derecha
  West: [0, -1], // Mover hacia la izquierda
};

// INICIALIZAR EL JUEGO
matrix = createSquareMatrix(dimension);
createRandomZombie(matrix);
createRandomRewards(matrix);
showTable(matrix);

// FUNCIONES
function createSquareMatrix(dim) {
  let matrix = [];
  for (let i = 0; i < dim; i++) {
    let row = [];
    for (let j = 0; j < dim; j++) {
      row[j] = 0; // Inicializamos la matriz con ceros
    }
    matrix[i] = row;
  }
  return matrix;
}

function createRandomZombie(matrix) {
  let zombieCounter = 0;
  while (zombieCounter < dimension) {
    let randomRow = Math.floor(Math.random() * matrix.length);
    let randomCol = Math.floor(Math.random() * matrix[0].length);

    if (
      (randomRow === 0 && randomCol === 0) ||
      (randomRow === matrix.length - 1 && randomCol === matrix[0].length - 1) ||
      matrix[randomRow][randomCol] !== 0
    ) {
      continue; // Salta a la siguiente iteración
    }

    matrix[randomRow][randomCol] = 2; // Asignar un zombi
    zombieCounter++;
  }
}

function createRandomRewards(matrix) {
  let rewardsNumber = Math.round(matrix.length / 4);
  let rewardsCounter = 0;
  while (rewardsCounter < rewardsNumber) {
    let randomRow = Math.floor(Math.random() * matrix.length);
    let randomCol = Math.floor(Math.random() * matrix[0].length);

    if (
      (randomRow === 0 && randomCol === 0) ||
      (randomRow === matrix.length - 1 && randomCol === matrix[0].length - 1) ||
      matrix[randomRow][randomCol] !== 0
    ) {
      continue;
    }

    matrix[randomRow][randomCol] = 3; // Asignar una recompensa
    rewardsCounter++;
  }
}

function showTable(matrix) {
  let displayStr = "";
  for (let i = 0; i < matrix.length; i++) {
    displayStr += matrix[i].join(" ") + "\n"; // Mostrar cada fila
  }
  console.log(displayStr);
}

// Función para obtener las direcciones válidas
// Función para obtener las direcciones válidas
function getValidDirections() {
  let validDirections = []; // Array para las direcciones válidas
  let [currentRow, currentCol] = playerPosition; // Obtener posición actual del jugador

  // Revisar cada dirección posible
  for (let dir in directions) {
    // Obtener el cambio de fila y columna para la dirección actual
    let [rowChange, colChange] = directions[dir];

    // Calcular la nueva posición
    let newRow = currentRow + rowChange;
    let newCol = currentCol + colChange;

    // Comprobar si la nueva posición es válida
    if (
      newRow >= 0 &&
      newRow < dimension && // Dentro de los límites de la matriz
      newCol >= 0 &&
      newCol < dimension && // Dentro de los límites de la matriz
      !visited.has(`${newRow},${newCol}`) // No ha sido visitada
    ) {
      validDirections.push(dir); // Agregar dirección válida
    }
  }

  return validDirections; // Devolver las direcciones válidas
}

// Función para pedir la dirección al usuario
function askDirection() {
  let validDirections = getValidDirections(); // Obtener direcciones válidas

  // Comprobar si no hay movimientos posibles
  if (validDirections.length === 0) {
    console.log("No hay movimientos posibles. Fin del juego.");
    return null; // Terminar juego si no hay movimientos
  }

  // Preguntar al usuario en qué dirección desea moverse
  let direction = prompt(
    "¿En qué dirección te quieres mover? " + validDirections.join(", ")
  ).trim();
  return validDirections.includes(direction) ? direction : null; // Comprobar si la dirección es válida
}

// Mover al jugador
function move() {
  let direction = askDirection(); // Pedir dirección al usuario

  // Si no hay dirección, salir
  if (!direction) return;

  // Obtener posición actual y calcular nueva posición
  let [currentRow, currentCol] = playerPosition;
  let [rowChange, colChange] = directions[direction];
  // Marcar la posición anterior como visitada
  matrix[currentRow][currentCol] = 1;
  // Actualizar posición del jugador
  playerPosition = [currentRow + rowChange, currentCol + colChange];
  visited.add(`${playerPosition[0]},${playerPosition[1]}`); // Marcar nueva posición como visitada

  // Mostrar nueva posición y cantidad de monedas
  console.log("Te has movido a", playerPosition, ". Monedas:", coins);
}

// Bucle del juego: Continuar hasta que llegue a la meta
while (
  playerPosition[0] !== dimension - 1 ||
  playerPosition[1] !== dimension - 1
) {
  move(); // Ejecutar movimiento
  showTable(matrix); // Mostrar estado actual del tablero
}
