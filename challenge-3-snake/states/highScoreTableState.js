import { highscores } from '../highscores.js'
import { CONFIRM, LIGHT, MEDIUM_DARK } from '../constants.js';
import { renderGrid } from '../utils.js';
import { confirmSound, highScoreSound } from '../sounds.js';

let complete = false;
let highScoreIndex = -1;
let time = 0;

const onEnter = (payload) => { 
  if (payload.highScoreIndex != undefined) {
    highScoreIndex = payload.highScoreIndex;
    highScoreSound.play();
  }
}

const handleInput = (event) => {
  if (event.key === CONFIRM) {
    if (!complete) {
      confirmSound.play();
      complete = true;
    }
  }
}

const update = (changeStateFn, dt) => {    
  if (complete) {
    changeStateFn('INGAME');
  }

  time += dt;
}

const render = (ctx) => {
  renderGrid(ctx);
  
  ctx.fillStyle = MEDIUM_DARK;
  ctx.fillRect(ctx.canvas.width * 0.2, ctx.canvas.width * 0.1, ctx.canvas.width * 0.6, ctx.canvas.width * 0.8);
  ctx.fillStyle = LIGHT;
  ctx.font = '30px Orbitron';
  ctx.textAlign = "center";
  ctx.fillText('High Scores', ctx.canvas.width * 0.5, ctx.canvas.width * 0.22);

  for(let i = 0; i < highscores.length; i++) {
    if (i === highScoreIndex) {
      ctx.fillRect(ctx.canvas.width * 0.25, ctx.canvas.width * (0.29 + 0.1 * i), ctx.canvas.width * 0.5, ctx.canvas.width * 0.07);
      ctx.fillStyle = `rgba(255,255,255, ${Math.sin(time)})`;
      ctx.fillRect(ctx.canvas.width * 0.25, ctx.canvas.width * (0.29 + 0.1 * i), ctx.canvas.width * 0.5, ctx.canvas.width * 0.07);
      ctx.fillStyle = MEDIUM_DARK;
    } else {
      ctx.fillStyle = LIGHT;
    }

    ctx.textAlign = "left";
    ctx.font = '20px Orbitron';
    ctx.fillText(`${i+1}.`, ctx.canvas.width * 0.34, ctx.canvas.width * (0.34 + 0.1 * i));
    ctx.fillText(highscores[i].name, ctx.canvas.width * 0.43, ctx.canvas.width * (0.34 + 0.1 * i));
    ctx.fillText(highscores[i].score, ctx.canvas.width * 0.59, ctx.canvas.width * (0.34 + 0.1 * i));
  };

  ctx.fillStyle = LIGHT;
  ctx.textAlign = "center";
  ctx.font = '16px Orbitron';
  ctx.fillText(`Press ${CONFIRM.toUpperCase()} to play again`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.86);
}

const onExit = () => { 
  highScoreIndex = -1;
  complete = false;
  time = 0;
}

const state = {
  onEnter,
  handleInput,
  update,
  render,
  onExit,
}

export default state;