import { PLAYER_HEIGHT, PLAYER_WIDTH, TILE, type GameState } from './types';
import { createLevel } from './level';

export function createInitialState(): GameState {
  const level = createLevel();

  return {
    player: {
      x: TILE,
      y: TILE * 8,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      velocity: { x: 0, y: 0 },
      grounded: false,
      invulnerableFor: 0,
    },
    tiles: level.tiles,
    coins: level.coins,
    enemies: level.enemies,
    goal: level.goal,
    cameraX: 0,
    score: 0,
    lives: 3,
    timeLeft: 180,
    status: 'playing',
    message: 'Reach the flag!',
  };
}
