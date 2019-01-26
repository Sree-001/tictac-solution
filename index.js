/**
 * This program is a boilerplate code for the standard tic tac toe game
 * Here the “box” represents one placeholder for either a “X” or a “0”
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed:
 * Imagine you are playing with the computer so every alternate move should be done by the computer
 * X -> player
 * O -> Computer
 *
 * Winner needs to be decided and has to be flashed
 *
 * Extra points will be given for approaching the problem more creatively
 * 
 */

var grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
var computers = [];
var oneDArray = this.getOneDimensionalGrid();
var userInputs = [];
var computerInputs = [];
var moves = 0;

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        } else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    moves = moves + 1;
    if (moves <= 4) {
        computerMove();
    }
    if (moves >= 3) {
        computeResult();
    }

}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function getOneDimensionalGrid() {
    var arrayString = grid.join();
    var oneDArray = arrayString.split(',');
    var newArray = []
    oneDArray.forEach((item) => {
        newArray.push(parseInt(item));
    })
    return newArray;
}

function computerMove() {

    var oneD = this.getOneDimensionalGrid();
    console.log(oneD);
    let randomNo = this.generateRandom();
    console.log(randomNo);

    //Getting User and Computer Indexes



    if (oneD[randomNo] == 0) {

        console.log("Total No of Moves ", moves);
        if (moves <= 4) {
            oneD[randomNo] = 2;
            let firstArray = oneD.slice(0, 3);
            let secondArray = oneD.slice(3, 6);
            let thirdArray = oneD.slice(6, 9);
            grid = [firstArray, secondArray, thirdArray];
        }
        renderMainGrid();
        addClickHandlers();

    } else {
        this.computerMove();
    }

    oneD.forEach((item, index) => {
        if (item === 1) {
            userInputs.push(index);
        } else if (item === 2) {
            computerInputs.push(index);
        } else {

        }

    });
    userInputs = Array.from(new Set(userInputs))
    computerInputs = Array.from(new Set(computerInputs))
    console.log('User INPUTS :', userInputs);
    console.log('Computer INPUTS :', computerInputs);
}


function generateRandom() {
    return Math.ceil(Math.random() * 8);
}

function computeResult() {
    const oneD = this.getOneDimensionalGrid();
    console.log("$$ From Compute Result :", oneD);
    let firstArrayString = oneD.slice(0, 3).join();
    let secondArrayString = oneD.slice(3, 6).join();
    let thirdArrayString = oneD.slice(6, 9).join();
    let firstArray = oneD.slice(0, 3);
    let secondArray = oneD.slice(3, 6);
    let thirdArray = oneD.slice(6, 9);

    if (firstArrayString === "1,1,1" ||
        secondArrayString === "1,1,1" ||
        thirdArrayString === "1,1,1" ||
        (firstArray[2] == 1 && secondArray[2] == 1 && thirdArray[2] == 1) ||
        (firstArray[1] == 1 && secondArray[1] == 1 && thirdArray[1] == 1) ||
        (firstArray[0] == 1 && secondArray[0] == 1 && thirdArray[0] == 1) ||
        (firstArray[2] == 1 && secondArray[1] == 1 && thirdArray[0] == 1) ||
        (firstArray[0] == 1 && secondArray[1] == 1 && thirdArray[2] == 1)
    ) {
        document.getElementById('resultMessage').textContent = " Player wins the Game "
    } else if (firstArrayString === "2,2,2" ||
        secondArrayString === "2,2,2" ||
        thirdArrayString === "2,2,2" ||
        (firstArray[2] == 2 && secondArray[2] == 2 && thirdArray[2] == 2) ||
        (firstArray[1] == 2 && secondArray[1] == 2 && thirdArray[1] == 2) ||
        (firstArray[0] == 2 && secondArray[0] == 2 && thirdArray[0] == 2) ||
        (firstArray[2] == 2 && secondArray[1] == 2 && thirdArray[0] == 2) ||
        (firstArray[0] == 2 && secondArray[1] == 2 && thirdArray[2] == 2)
    ) {
        document.getElementById('resultMessage').textContent = " Computer wins the Game "
        // alert("Computer Wins the Game");
    } else {
        if (moves > 4) {
            // alert("Game is Draw");
            document.getElementById('resultMessage').textContent = " The Game is Draw "
        }
    }

}

function resetGame() {
    grid = [];
    // GRID_LENGTH = 3;
    turn = 'X';
    computers = [];
    oneDArray = this.getOneDimensionalGrid();
    userInputs = [];
    computerInputs = [];
    moves = 0;
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
    document.getElementById('resultMessage').textContent = "";
}



initializeGrid();
renderMainGrid();
addClickHandlers();