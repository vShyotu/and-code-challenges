import { CONFIRM, MEDIUM_DARK, LIGHT } from "../constants.js"
import { renderGrid } from '../utils.js';
import { confirmSound } from '../sounds.js';
import { isHighScore } from '../highscores.js';

let complete = false;
let score = 0;

const onEnter = (payload) => {
  if (payload?.score) {
    score = payload.score;
  }  
}

const handleInput = (event) => {
  if (event.key === CONFIRM) {
    complete = true;
  }
}

const update = (changeState) => { 
  if (complete) {
    if (isHighScore(score)) {
      changeState('NEW_HIGH_SCORE', { score });
    } else {
      changeState("HIGH_SCORES");
    }
    
    confirmSound.play();
  }
}

const render = (ctx) => {
  renderGrid(ctx);
  ctx.fillStyle = MEDIUM_DARK;
  ctx.fillRect(ctx.canvas.width * 0.25, ctx.canvas.width * 0.35, ctx.canvas.width * 0.5, ctx.canvas.width * 0.3);
  
  ctx.fillStyle = LIGHT;
  ctx.font = '30px Orbitron';
  ctx.textAlign = "center";
  ctx.fillText('Game Over', ctx.canvas.width * 0.5, ctx.canvas.width * 0.45);
  ctx.font = '20px Orbitron';
  ctx.fillText(`Score: ${score}`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.53);
  ctx.font = '16px Orbitron';
  ctx.fillText(`Press ${CONFIRM.toUpperCase()}`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.60);
}

const onExit = () => {
  complete = false;
  score = 0;
}

const state = {
  onEnter,
  handleInput,
  update, 
  render,
  onExit
}

export default state;