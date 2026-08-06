// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');


const readlineSync = require('readline-sync');

function readMatrix(rows, cols, label) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    let rowValues;

    while (true) {
      const line = readlineSync.question(`Enter row ${i + 1} for ${label}: `);
      rowValues = line.trim().split(/\s+/).map(Number);

      if (rowValues.length === cols && rowValues.every((n) => !isNaN(n))) {
        break;
      }
      console.log(`Please enter exactly ${cols} numbers separated by spaces.`);
    }

    matrix.push(rowValues);
  }

  return matrix;
}

function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let rowText = '';
    for (let j = 0; j < matrix[i].length; j++) {
      rowText += String(matrix[i][j]).padStart(5);
    }
    console.log(rowText);
  }
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

function multiplyMatrices(a, b) {
  const m = a.length;
  const n = b.length;
  const p = b[0].length;
  const result = [];

  for (let i = 0; i < m; i++) {
    const newRow = [];
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

function main() {
  console.log('=== Part A: Transpose a Matrix ===');
  const rowsA = readlineSync.questionInt('Enter number of rows: ');
  const colsA = readlineSync.questionInt('Enter number of columns: ');
  const matrixA = readMatrix(rowsA, colsA, 'Matrix');

  console.log('\nOriginal Matrix:');
  printMatrix(matrixA);

  const transposed = transposeMatrix(matrixA);
  console.log('\nTransposed Matrix:');
  printMatrix(transposed);

  console.log('\n=== Part B: Add Two Matrices ===');
  const addRows = readlineSync.questionInt('Enter number of rows for both matrices: ');
  const addCols = readlineSync.questionInt('Enter number of columns for both matrices: ');

  const matrixB1 = readMatrix(addRows, addCols, 'Matrix 1');
  const matrixB2 = readMatrix(addRows, addCols, 'Matrix 2');

  const sumMatrix = addMatrices(matrixB1, matrixB2);
  console.log('\nSum Matrix:');
  printMatrix(sumMatrix);

  console.log('\n=== Part C: Multiply Two Matrices ===');
  const rowsC1 = readlineSync.questionInt('Enter number of rows for Matrix A: ');
  const colsC1 = readlineSync.questionInt('Enter number of columns for Matrix A: ');
  const matrixC1 = readMatrix(rowsC1, colsC1, 'Matrix A');

  console.log(`Matrix B must have ${colsC1} rows (to match Matrix A's columns).`);
  const colsC2 = readlineSync.questionInt('Enter number of columns for Matrix B: ');
  const matrixC2 = readMatrix(colsC1, colsC2, 'Matrix B');

  const productMatrix = multiplyMatrices(matrixC1, matrixC2);
  console.log('\nProduct Matrix (A x B):');
  printMatrix(productMatrix);
}

main();