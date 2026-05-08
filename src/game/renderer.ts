import { levelHeight } from './level';
import { TILE, type GameState, type Tile } from './types';

function drawTile(context: CanvasRenderingContext2D, tile: Tile): void {
  if (tile.kind === 'ground') {
    context.fillStyle = '#8b5a2b';
    context.fillRect(tile.x, tile.y, tile.width, tile.height);
    context.fillStyle = '#4caf50';
    context.fillRect(tile.x, tile.y, tile.width, 10);
  }

  if (tile.kind === 'brick') {
    context.fillStyle = '#b75d2a';
    context.fillRect(tile.x, tile.y, tile.width, tile.height);
    context.strokeStyle = '#733612';
    context.strokeRect(tile.x + 2, tile.y + 2, tile.width - 4, tile.height - 4);
  }

  if (tile.kind === 'question') {
    context.fillStyle = '#f2bf3d';
    context.fillRect(tile.x, tile.y, tile.width, tile.height);
    context.fillStyle = '#5f3b00';
    context.font = 'bold 28px sans-serif';
    context.fillText('?', tile.x + 15, tile.y + 34);
  }

  if (tile.kind === 'used') {
    context.fillStyle = '#ad8f58';
    context.fillRect(tile.x, tile.y, tile.width, tile.height);
  }
}

function drawHud(context: CanvasRenderingContext2D, state: GameState, width: number): void {
  context.save();
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.fillStyle = 'rgba(18, 22, 34, 0.72)';
  context.fillRect(20, 18, width - 40, 52);
  context.fillStyle = '#fff2a8';
  context.font = 'bold 24px sans-serif';
  context.fillText(`Score ${state.score}`, 38, 52);
  context.fillText(`Lives ${state.lives}`, 220, 52);
  context.fillText(`Time ${Math.ceil(state.timeLeft)}`, 360, 52);
  context.fillText(state.message, 520, 52);
  context.restore();
}

export function render(context: CanvasRenderingContext2D, state: GameState, width: number, height: number): void {
  context.clearRect(0, 0, width, height);

  const skyGradient = context.createLinearGradient(0, 0, 0, height);
  skyGradient.addColorStop(0, '#78c7ff');
  skyGradient.addColorStop(1, '#d8f3ff');
  context.fillStyle = skyGradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.translate(-state.cameraX, 0);

  context.fillStyle = '#9be27f';
  context.fillRect(state.cameraX, levelHeight - TILE * 2.15, width, 20);

  for (const tile of state.tiles) {
    drawTile(context, tile);
  }

  for (const coin of state.coins) {
    if (!coin.collected) {
      context.fillStyle = '#ffd84d';
      context.beginPath();
      context.ellipse(coin.x + coin.width / 2, coin.y + coin.height / 2, coin.width / 2, coin.height / 2, 0, 0, Math.PI * 2);
      context.fill();
    }
  }

  for (const enemy of state.enemies) {
    if (enemy.alive) {
      context.fillStyle = '#6b2d19';
      context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      context.fillStyle = '#ffffff';
      context.fillRect(enemy.x + 8, enemy.y + 8, 6, 6);
      context.fillRect(enemy.x + 22, enemy.y + 8, 6, 6);
    }
  }

  context.fillStyle = '#2e7d32';
  context.fillRect(state.goal.x, state.goal.y, state.goal.width, state.goal.height);
  context.fillStyle = '#ff5252';
  context.beginPath();
  context.moveTo(state.goal.x + state.goal.width, state.goal.y + 8);
  context.lineTo(state.goal.x + state.goal.width + 58, state.goal.y + 28);
  context.lineTo(state.goal.x + state.goal.width, state.goal.y + 48);
  context.closePath();
  context.fill();

  context.fillStyle = state.player.invulnerableFor > 0 ? '#ffffff' : '#e53935';
  context.fillRect(state.player.x, state.player.y, state.player.width, state.player.height);
  context.fillStyle = '#2638d9';
  context.fillRect(state.player.x, state.player.y + state.player.height * 0.5, state.player.width, state.player.height * 0.5);

  context.restore();
  drawHud(context, state, width);

  if (state.status !== 'playing') {
    context.fillStyle = 'rgba(0, 0, 0, 0.58)';
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#ffffff';
    context.font = 'bold 44px sans-serif';
    context.textAlign = 'center';
    context.fillText(state.status === 'won' ? 'You Win!' : 'Game Over', width / 2, height / 2 - 20);
    context.font = '24px sans-serif';
    context.fillText('Press R to restart', width / 2, height / 2 + 28);
    context.textAlign = 'start';
  }
}
