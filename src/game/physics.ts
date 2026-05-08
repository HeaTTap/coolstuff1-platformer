import { levelHeight, levelWidth } from './level';
import {
  ENEMY_SPEED,
  JUMP_SPEED,
  MOVE_SPEED,
  WORLD_GRAVITY,
  intersects,
  type Controls,
  type Enemy,
  type GameState,
  type Player,
  type Tile,
} from './types';

function moveHorizontally(body: Player | Enemy, tiles: Tile[], dt: number): boolean {
  body.x += body.velocity.x * dt;
  let collided = false;

  for (const tile of tiles) {
    if (!intersects(body, tile)) {
      continue;
    }

    collided = true;

    if (body.velocity.x > 0) {
      body.x = tile.x - body.width;
    } else if (body.velocity.x < 0) {
      body.x = tile.x + tile.width;
    }

    body.velocity.x = 0;
  }

  return collided;
}

function moveVertically(body: Player | Enemy, tiles: Tile[], dt: number): 'none' | 'floor' | 'ceiling' {
  body.velocity.y += WORLD_GRAVITY * dt;
  body.y += body.velocity.y * dt;
  let hit: 'none' | 'floor' | 'ceiling' = 'none';

  for (const tile of tiles) {
    if (!intersects(body, tile)) {
      continue;
    }

    if (body.velocity.y > 0) {
      body.y = tile.y - body.height;
      body.velocity.y = 0;
      hit = 'floor';
    } else if (body.velocity.y < 0) {
      body.y = tile.y + tile.height;
      body.velocity.y = 0;
      hit = 'ceiling';
    }
  }

  return hit;
}

function activateQuestionBlocks(state: GameState): void {
  for (const tile of state.tiles) {
    const touchingFromBelow =
      tile.kind === 'question' &&
      !tile.used &&
      state.player.y <= tile.y + tile.height &&
      state.player.y > tile.y &&
      state.player.x + state.player.width > tile.x + 4 &&
      state.player.x < tile.x + tile.width - 4;

    if (touchingFromBelow) {
      tile.kind = 'used';
      tile.used = true;
      state.coins.push({ x: tile.x + 14, y: tile.y - 30, width: 20, height: 28, collected: false });
      state.score += 50;
    }
  }
}

function collectCoins(state: GameState): void {
  for (const coin of state.coins) {
    if (!coin.collected && intersects(state.player, coin)) {
      coin.collected = true;
      state.score += 100;
    }
  }
}

function updateEnemies(state: GameState, dt: number): void {
  for (const enemy of state.enemies) {
    if (!enemy.alive) {
      continue;
    }

    if (enemy.velocity.x === 0) {
      enemy.velocity.x = -ENEMY_SPEED;
    }

    const collided = moveHorizontally(enemy, state.tiles, dt);
    moveVertically(enemy, state.tiles, dt);

    if (collided) {
      enemy.velocity.x = enemy.velocity.x <= 0 ? ENEMY_SPEED : -ENEMY_SPEED;
    }
  }
}

function damagePlayer(state: GameState): void {
  if (state.player.invulnerableFor > 0 || state.status !== 'playing') {
    return;
  }

  state.lives -= 1;
  state.player.invulnerableFor = 1.2;
  state.player.x = Math.max(48, state.player.x - 180);
  state.player.y = 48;
  state.player.velocity = { x: 0, y: 0 };
  state.message = 'Ouch!';

  if (state.lives <= 0) {
    state.status = 'lost';
    state.message = 'Game over. Press R to restart.';
  }
}

function handleEnemyCollisions(state: GameState): void {
  for (const enemy of state.enemies) {
    if (!enemy.alive || !intersects(state.player, enemy)) {
      continue;
    }

    const playerWasAbove = state.player.velocity.y > 0 && state.player.y + state.player.height - enemy.y < 22;

    if (playerWasAbove) {
      enemy.alive = false;
      state.player.velocity.y = -JUMP_SPEED * 0.55;
      state.score += 250;
    } else {
      damagePlayer(state);
    }
  }
}

function checkFall(state: GameState): void {
  if (state.player.y > levelHeight + 120) {
    damagePlayer(state);
  }
}

function checkGoalAndTimer(state: GameState, dt: number): void {
  state.timeLeft = Math.max(0, state.timeLeft - dt);

  if (state.timeLeft === 0) {
    state.status = 'lost';
    state.message = 'Time up. Press R to restart.';
  }

  if (intersects(state.player, state.goal)) {
    state.status = 'won';
    state.message = 'You reached the flag! Press R to play again.';
  }
}

function clampPlayerToWorld(state: GameState): void {
  state.player.x = Math.max(0, Math.min(state.player.x, levelWidth - state.player.width));
}

export function updateGameState(state: GameState, controls: Controls, dt: number, viewportWidth: number): void {
  if (state.status !== 'playing') {
    return;
  }

  checkGoalAndTimer(state, dt);
  if (state.status !== 'playing') {
    return;
  }

  state.player.invulnerableFor = Math.max(0, state.player.invulnerableFor - dt);
  state.player.velocity.x = 0;

  if (controls.left) {
    state.player.velocity.x = -MOVE_SPEED;
  }

  if (controls.right) {
    state.player.velocity.x = MOVE_SPEED;
  }

  if (controls.jump && state.player.grounded) {
    state.player.velocity.y = -JUMP_SPEED;
    state.player.grounded = false;
  }

  moveHorizontally(state.player, state.tiles, dt);
  const verticalHit = moveVertically(state.player, state.tiles, dt);
  state.player.grounded = verticalHit === 'floor';

  if (verticalHit === 'ceiling') {
    activateQuestionBlocks(state);
  }

  clampPlayerToWorld(state);
  updateEnemies(state, dt);
  collectCoins(state);
  handleEnemyCollisions(state);
  checkFall(state);

  state.cameraX = Math.max(0, Math.min(state.player.x - viewportWidth * 0.38, levelWidth - viewportWidth));
}
