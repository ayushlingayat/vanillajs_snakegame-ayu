import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './components/snake.js';
import { update as updateFood, draw as drawFood } from './components/food.js';
import { draw as drawScore } from './components/score.js';
import { outsideGrid } from './components/grid.js';

const gameBoard = document.getElementById("game-board");
const scoreBoard = document.getElementById("score-board");
const gameOverSound = new Audio("../assets/game-over.wav");
let lastRenderTime = 0;
let gameOver = false;

function main(currentTime) {
    if (gameOver) {
        gameOverSound.play();
        if (confirm("You lost! Press OK to restart.")) {
            window.location = '/';
        }
        return;
    }

    window.requestAnimationFrame(main);

    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    update(); // updates logic of game (if we ate the food or not/ snake is longer or shorter/ game is over or not)
    draw(); // takes the updated logic and draws it (snake and food) on the screen
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
    drawScore(scoreBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
