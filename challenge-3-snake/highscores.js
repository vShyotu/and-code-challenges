const defaultHighScores = [
  { name: 'SNK', score: 20 },
  { name: 'AND', score: 13 },
  { name: 'SHY', score: 10 },
  { name: 'LOL', score: 5 },
  { name: 'BAD', score: 3 },
];

const loadHighScores = () => {
  return JSON.parse(localStorage.getItem('snakeHighScores')) || defaultHighScores;
}

export let highscores = loadHighScores();

const saveHighScores = () => {
  localStorage.setItem('snakeHighScores', JSON.stringify(highscores));
}

export const isHighScore = (newScore) => {
  return highscores.findIndex((highScore) => highScore.score < newScore) > -1 ? true : false;
}

export const submitHighScore = (newHighScore) => {
  const scoreIndex = highscores.findIndex((existingHighScore) => existingHighScore.score < newHighScore.score);
  
  if (scoreIndex != -1) {
    highscores.splice(scoreIndex, 0, newHighScore);
    highscores.pop();
    saveHighScores(highscores);
  }

  return scoreIndex;
}