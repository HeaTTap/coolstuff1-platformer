import { describe, expect, it } from 'vitest';
import { createInitialState } from './entities';
import { updateGameState } from './physics';
import { TILE, type Controls } from './types';

const idle: Controls = { left: false, right: false, jump: false, restart: false };

describe('createInitialState', () => {
  it('creates a playable level with hazards, rewards, and a goal', () => {
    const state = createInitialState();

    expect(state.lives).toBe(3);
    expect(state.status).toBe('playing');
    expect(state.tiles.length).toBeGreaterThan(20);
    expect(state.coins.length).toBeGreaterThan(2);
    expect(state.enemies.length).toBeGreaterThan(1);
    expect(state.goal.x).toBeGreaterThan(TILE * 20);
  });
});

describe('updateGameState', () => {
  it('collects coins and increases score', () => {
    const state = createInitialState();
    const coin = state.coins[0];
    state.player.x = coin.x;
    state.player.y = coin.y;

    updateGameState(state, idle, 1 / 60, 960);

    expect(coin.collected).toBe(true);
    expect(state.score).toBe(100);
  });

  it('stomps enemies when falling from above', () => {
    const state = createInitialState();
    const enemy = state.enemies[0];
    state.player.x = enemy.x;
    state.player.y = enemy.y - state.player.height + 4;
    state.player.velocity.y = 500;

    updateGameState(state, idle, 1 / 60, 960);

    expect(enemy.alive).toBe(false);
    expect(state.score).toBe(250);
    expect(state.player.velocity.y).toBeLessThan(0);
  });

  it('wins when the player touches the goal', () => {
    const state = createInitialState();
    state.player.x = state.goal.x;
    state.player.y = state.goal.y;

    updateGameState(state, idle, 1 / 60, 960);

    expect(state.status).toBe('won');
  });
});
