import { LIGHT, MEDIUM_DARK, DARK, CELL_COUNT, CENTER, LEFT, RIGHT, UP, DOWN, CONFIRM } from '../constants.js';
import { randomPositionOnBoard, renderGrid } from '../utils.js';

import { eatSound, dieSound, moveSound, confirmSound } from '../sounds.js';

let position;
let food;
let foodRotation;
let direction;
let lastDirection;
let paused;
let snake;
let score;
let started;
let foodUnderSnake;

const onEnter = () => {
  paused = true;
  food = randomPositionOnBoard(); 
  foodRotation = 0;
  foodUnderSnake = false;
  position = { x: CENTER, y: CENTER };
  direction = { x: 1, y: 0 };
  lastDirection = { x: 1, y: 0 };
  snake = [];
  snake.push({ x: CENTER,     y: CENTER });
  snake.push({ x: CENTER - 1, y: CENTER });
  snake.push({ x: CENTER - 2, y: CENTER });
  score = 0;
  started = false;
}

const handleInput = (event) => {
  if (!paused) {
    if (event.key === LEFT) {
      if (!(lastDirection.x === 1 && lastDirection.y === 0)) {
        moveSound.play();
        direction = { x: -1, y: 0 };
      }
    } else if (event.key === RIGHT) {
      if (!(lastDirection.x === -1 && lastDirection.y === 0)) {
        moveSound.play();
        direction = { x: 1, y: 0 };
      }
    } else if (event.key === UP) {
      if (!(lastDirection.x === 0 && lastDirection.y === 1)) {
        moveSound.play();
        direction = { x: 0, y: -1 };
      }
    } else if (event.key === DOWN) {
      if (!(lastDirection.x === 0 && lastDirection.y === -1)) {
        moveSound.play();
        direction = { x: 0, y: 1 };
      }
    }
  }

  if (event.key === CONFIRM) {
    if (!started) {
      started = true;
    }
    paused = !paused;
    confirmSound.play();
  }
}

const update = (changeState, dt) => {
  const isCollidingWithSnake = (position, snake) => {
    for(let i = 1; i < snake.length; i++) {
      if (position.x === snake[i].x && position.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }
  
  const isOutOfBounds = (position) => {
    return position.x < 0 || position.x >= CELL_COUNT || position.y < 0 || position.y >= CELL_COUNT;
  }

  

  if (!paused) {
    if (position.x === food.x && position.y === food.y) {
      eatSound.play();
      score++;
      food = randomPositionOnBoard(); 
    } else {
      snake.pop();
    }

    foodRotation += (dt/1000) * (0.5) * (2 * Math.PI);

    if (isCollidingWithSnake(food, snake)) {
      foodUnderSnake = true;
    } else {
      foodUnderSnake = false;
    }

    position = { x: position.x + direction.x, y: position.y + direction.y}
    lastDirection = {...direction};

    snake.unshift(position);

    if (isOutOfBounds(position) || isCollidingWithSnake(position, snake)) {
      dieSound.play();
      changeState('GAME_OVER', { score });
    }
  }
}

const render = (ctx) => {
  const renderFood = (ctx, { x, y }) => {
    ctx.fillStyle = MEDIUM_DARK;
    
    ctx.save();
      if (foodUnderSnake) {
        ctx.fillStyle = LIGHT;
      } else {
        ctx.fillStyle = MEDIUM_DARK;
      }
      ctx.translate((x * ctx.canvas.width / CELL_COUNT) + ctx.canvas.width / CELL_COUNT / 2, (y * ctx.canvas.width / CELL_COUNT) + ctx.canvas.width / CELL_COUNT / 2);
      ctx.rotate(foodRotation);
      ctx.fillRect(-ctx.canvas.width / CELL_COUNT/4, -ctx.canvas.width / CELL_COUNT/4, ctx.canvas.width / CELL_COUNT/2, ctx.canvas.width / CELL_COUNT/2);
    ctx.restore();
  }
  
  const renderSnake = (ctx, snake) => {
    snake.forEach((piece) => {
      ctx.fillStyle = MEDIUM_DARK;
      ctx.fillRect(piece.x * ctx.canvas.width / CELL_COUNT, piece.y * ctx.canvas.width / CELL_COUNT, ctx.canvas.width / CELL_COUNT, ctx.canvas.width / CELL_COUNT);
    })
  };
  
  const renderScore = (ctx, score) => {
    ctx.fillStyle = DARK;
    ctx.font = '30px Orbitron';
    ctx.textAlign = "left";
    ctx.fillText(score, 12, 35);
  }

  const renderStartMenu = (ctx) => {
    ctx.fillStyle = MEDIUM_DARK;
    ctx.fillRect(ctx.canvas.width * 0.25, ctx.canvas.width * 0.30, ctx.canvas.width * 0.5, ctx.canvas.width * 0.35);
    ctx.fillStyle = LIGHT;
    ctx.font = '30px Orbitron';
    ctx.textAlign = "center";
    ctx.fillText('Snake', ctx.canvas.width * 0.5, ctx.canvas.width * 0.40);
    ctx.font = '16px Orbitron';
    ctx.fillText(`${UP.toUpperCase()}${LEFT.toUpperCase()}${DOWN.toUpperCase()}${RIGHT.toUpperCase()} - Movement`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.48);
    ctx.fillText(`${CONFIRM.toUpperCase()} - Pause`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.52);
    ctx.fillText(`Press ${CONFIRM.toUpperCase()} to begin`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.6);
  }
  
  const renderPauseMenu = (ctx) => {
    ctx.fillStyle = MEDIUM_DARK;
    ctx.fillRect(ctx.canvas.width * 0.25, ctx.canvas.width * 0.4, ctx.canvas.width * 0.5, ctx.canvas.width * 0.15);
    ctx.fillStyle = LIGHT;
    ctx.font = '30px Orbitron';
    ctx.textAlign = "center";
    ctx.fillText('Paused', ctx.canvas.width * 0.5, ctx.canvas.width * 0.48);
    ctx.font = '16px Orbitron';
    ctx.fillText(`Press ${CONFIRM.toUpperCase()} to resume`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.53);
  }

  renderGrid(ctx); 

  if (started) {
    renderSnake(ctx, snake);
    renderFood(ctx, food);
    renderScore(ctx, score);

    if (paused) {
      renderPauseMenu(ctx);
    }
  } else {
    renderStartMenu(ctx);
  }


}

const onExit = () => {
  // No op
}

const state = {
  onEnter,
  handleInput,
  update, 
  render,
  onExit
}

export default state;