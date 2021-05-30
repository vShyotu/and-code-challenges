import { CELL_COUNT, MEDIUM_LIGHT } from './constants.js';

export const modulo = (n, m) => {
  return ((n % m) + m) % m; 
}

export const randomPositionOnBoard = () => {
  return { x: Math.floor(Math.random() * CELL_COUNT), y: Math.floor(Math.random() * CELL_COUNT)};
}

export const renderGrid = (ctx) => {
  for (let i = 0; i < CELL_COUNT; i++) {
    ctx.strokeStyle = MEDIUM_LIGHT;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(i * ctx.canvas.width / CELL_COUNT - 0.5, 0 - 0.5);
    ctx.lineTo(i * ctx.canvas.width / CELL_COUNT - 0.5, ctx.canvas.height - 0.5);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0 - 0.5, i * ctx.canvas.width / CELL_COUNT - 0.5);
    ctx.lineTo(ctx.canvas.width - 0.5, i * ctx.canvas.width / CELL_COUNT - 0.5);
    ctx.stroke();
  }
}