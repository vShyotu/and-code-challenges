import ingameState from './states/ingameState.js';
import newHighScoreInputState from './states/newHighScoreInputState.js';
import highScoreTableState from './states/highScoreTableState.js';
import gameOverState from './states/gameOverState.js';
import { DARK, MEDIUM_DARK, MEDIUM_LIGHT, LIGHT } from './constants.js';

const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

const root = document.documentElement;
root.style.setProperty('--dark', DARK);
root.style.setProperty('--medium-dark', MEDIUM_DARK);
root.style.setProperty('--medium-light', MEDIUM_LIGHT);
root.style.setProperty('--light', LIGHT);

const main = () => {
  let state = null;

  const handleInput = (event) => {
    state.handleInput(event);
  }

  const changeState = (newState, payload) => {
    let nextState = null;
    
    switch (newState) {
      case "INGAME":
        nextState = ingameState;
        break;
      case "NEW_HIGH_SCORE":
        nextState = newHighScoreInputState;
        break;
      case "HIGH_SCORES":
        nextState = highScoreTableState;
        break;
      case "GAME_OVER":
        nextState = gameOverState;
        break;
      default:
        nextState = ingameState;
        break;
    }

    if (state !== nextState) {
      if (state != null) {
        state.onExit();
      }
      state = nextState;
      nextState.onEnter(payload);
    }
  }

  const gameLoop = () => {
    const dt = 100;
    state.update(changeState, dt);
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    state.render(ctx);
  }

  changeState("INGAME");

  document.addEventListener('keydown', handleInput);
  setInterval(gameLoop, 100);
}

main();





