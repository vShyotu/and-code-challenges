import { submitHighScore } from '../highscores.js';
import { LEFT, MEDIUM_DARK, LIGHT, RIGHT, UP, DOWN, CONFIRM } from '../constants.js';
import { modulo } from '../utils.js';
import { renderGrid } from '../utils.js';
import { confirmSound, moveSound, highScoreSound } from '../sounds.js';

let complete = false;
let score = 0;
const newHighScoreName = ['A', 'A', 'A'];
let newHighScoreIndex = -1;
let currentHighScoreInputIndex = 0;
let time = 0;

const onEnter = (payload) => { 
  score = payload.score;
  highScoreSound.play();
}

const handleInput = (event) => {
  if (event.key === LEFT) {
    currentHighScoreInputIndex = modulo(currentHighScoreInputIndex - 1, 3);
    moveSound.play();
  } else if (event.key === RIGHT) {
    currentHighScoreInputIndex = modulo(currentHighScoreInputIndex + 1, 3);
    moveSound.play();
  } else if (event.key === UP) {
    newHighScoreName[currentHighScoreInputIndex] = String.fromCharCode(65 + modulo((newHighScoreName[currentHighScoreInputIndex].charCodeAt(0) - 65 - 1), 26));
    moveSound.play();
  } else if (event.key === DOWN) {
    newHighScoreName[currentHighScoreInputIndex] = String.fromCharCode(65 + modulo((newHighScoreName[currentHighScoreInputIndex].charCodeAt(0) - 65 + 1), 26));
    moveSound.play();
  } else if (event.key === CONFIRM) {
    if (!complete) {
      newHighScoreIndex = submitHighScore({ name: newHighScoreName.join(''), score });
      complete = true;
    }
    confirmSound.play();
  }
}

const update = (changeState, dt) => {    
  if (complete) {
    changeState('HIGH_SCORES', { highScoreIndex: newHighScoreIndex });
  }

  time += dt;
}

const render = (ctx) => {
  const renderWindow = (ctx) => {
    // Window Rect
    ctx.fillStyle = MEDIUM_DARK;
    ctx.fillRect(ctx.canvas.width * 0.2, ctx.canvas.width * 0.1, ctx.canvas.width * 0.6, ctx.canvas.width * 0.8);
  
    // Title
    ctx.fillStyle = LIGHT;
    ctx.font = '30px Orbitron';
    ctx.textAlign = "center";
    ctx.fillText('New High Score!', ctx.canvas.width * 0.5, ctx.canvas.width * 0.22);
  
    // Score
    ctx.font = '26px Orbitron';
    ctx.fillText(score, ctx.canvas.width * 0.5, ctx.canvas.width * 0.35);
  
    // Name Label
    ctx.font = '20px Orbitron';
    ctx.fillText(`Name:`, ctx.canvas.width * 0.35, ctx.canvas.width * 0.55);
  }
  
  const renderActiveNameSelector = (ctx, index) => {
    ctx.fillStyle = LIGHT;
    
    // Top Arrow
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width * (0.48 + index * 0.1), ctx.canvas.width * 0.47);
    ctx.lineTo(ctx.canvas.width * (0.50 + index * 0.1), ctx.canvas.width * 0.45);
    ctx.lineTo(ctx.canvas.width * (0.52 + index * 0.1), ctx.canvas.width * 0.47);
    ctx.fill();
  
    // Bottom Arrow
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width * (0.48 + index * 0.1), ctx.canvas.width * 0.60);
    ctx.lineTo(ctx.canvas.width * (0.50 + index * 0.1), ctx.canvas.width * 0.62);
    ctx.lineTo(ctx.canvas.width * (0.52 + index * 0.1), ctx.canvas.width * 0.60);
    ctx.fill();
  
    // Highlight Rect
    ctx.fillRect(ctx.canvas.width * (0.45 + index * 0.1), ctx.canvas.width * 0.485, ctx.canvas.width * 0.10, ctx.canvas.width * 0.10);
   
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.sin(time)})`;
    
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width * (0.48 + index * 0.1), ctx.canvas.width * 0.47);
    ctx.lineTo(ctx.canvas.width * (0.50 + index * 0.1), ctx.canvas.width * 0.45);
    ctx.lineTo(ctx.canvas.width * (0.52 + index * 0.1), ctx.canvas.width * 0.47);
    ctx.fill();
  
    // Bottom Arrow
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width * (0.48 + index * 0.1), ctx.canvas.width * 0.60);
    ctx.lineTo(ctx.canvas.width * (0.50 + index * 0.1), ctx.canvas.width * 0.62);
    ctx.lineTo(ctx.canvas.width * (0.52 + index * 0.1), ctx.canvas.width * 0.60);
    ctx.fill();
  
    // Highlight Rect
    ctx.fillRect(ctx.canvas.width * (0.45 + index * 0.1), ctx.canvas.width * 0.485, ctx.canvas.width * 0.10, ctx.canvas.width * 0.10);
    
    // Character
    ctx.fillStyle = MEDIUM_DARK;
    ctx.font = '20px Orbitron';
    ctx.textAlign = "center";
    ctx.fillText(`${newHighScoreName[index]}`, ctx.canvas.width * (0.5 + index * 0.1), ctx.canvas.width * 0.55);
  }
  
  const renderInactiveNameSelector = (ctx, index) => {
    ctx.fillStyle = LIGHT;
    ctx.font = '20px Orbitron';
    ctx.textAlign = "center";
    ctx.fillText(`${newHighScoreName[index]}`, ctx.canvas.width * (50 + index * 10)/100, ctx.canvas.width * 55/100);
  }

  renderGrid(ctx);
  renderWindow(ctx);

  for(let i = 0; i < newHighScoreName.length; i++) {
    if (i === currentHighScoreInputIndex) {
      renderActiveNameSelector(ctx, i);
    } else {
      renderInactiveNameSelector(ctx, i);
    }
  };

  ctx.fillStyle = LIGHT;
  ctx.textAlign = 'center';
  ctx.font = '16px Orbitron';
  ctx.fillText(`${UP.toUpperCase()}${LEFT.toUpperCase()}${DOWN.toUpperCase()}${RIGHT.toUpperCase()} to select letters`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.75);
  ctx.fillText(`${CONFIRM.toUpperCase()} to confirm when finished`, ctx.canvas.width * 0.5, ctx.canvas.width * 0.8);
}

const onExit = () => { 
  complete = false;
}

const state = {
  onEnter,
  handleInput,
  update,
  render,
  onExit,
}

export default state;