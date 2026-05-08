# TypeScript Vite Platformer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a playable Super Mario-inspired single-level TypeScript/Vite canvas platformer in `/home/aaronlm/Documents/coolstuff1/`.

**Architecture:** Use Vite to serve a browser canvas app. Keep game logic in focused TypeScript modules under `src/game/`: input, types, level data, entities/state creation, physics, rendering, and game loop orchestration.

**Tech Stack:** TypeScript, Vite, HTML5 Canvas, CSS, Vitest for lightweight logic tests.

---

## File Structure

- Create `package.json`: scripts and dev dependencies.
- Create `index.html`: app shell.
- Create `tsconfig.json`: TypeScript compiler settings.
- Create `vite.config.ts`: Vite + Vitest config.
- Create `src/styles.css`: page/canvas styling.
- Create `src/main.ts`: mount the game.
- Create `src/game/types.ts`: shared constants, types, and helpers.
- Create `src/game/input.ts`: keyboard state.
- Create `src/game/level.ts`: level layout and object definitions.
- Create `src/game/entities.ts`: initial game state creation.
- Create `src/game/physics.ts`: movement, collision, pickups, damage, timer, and win/loss logic.
- Create `src/game/renderer.ts`: canvas drawing.
- Create `src/game/game.ts`: animation loop and restart wiring.
- Create `src/game/physics.test.ts`: logic coverage for collision/pickup/stomp behavior.

---

### Task 1: Project Scaffold

**Files:**
- Create: `/home/aaronlm/Documents/coolstuff1/package.json`
- Create: `/home/aaronlm/Documents/coolstuff1/tsconfig.json`
- Create: `/home/aaronlm/Documents/coolstuff1/vite.config.ts`
- Create: `/home/aaronlm/Documents/coolstuff1/index.html`
- Create: `/home/aaronlm/Documents/coolstuff1/src/styles.css`
- Create: `/home/aaronlm/Documents/coolstuff1/src/main.ts`

- [ ] **Step 1: Write package metadata**

Create `/home/aaronlm/Documents/coolstuff1/package.json`:

```json
{
  "name": "coolstuff1-platformer",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "tsc && vite build",
    "test": "vitest run"
  },
  "devDependencies": {
    "@vitejs/plugin-basic-ssl": "latest",
    "typescript": "latest",
    "vite": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Write TypeScript config**

Create `/home/aaronlm/Documents/coolstuff1/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"],
  "references": []
}
```

- [ ] **Step 3: Write Vite config**

Create `/home/aaronlm/Documents/coolstuff1/vite.config.ts`:

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  test: {
    environment: 'node',
  },
});
```

- [ ] **Step 4: Write HTML shell**

Create `/home/aaronlm/Documents/coolstuff1/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Coolstuff Platformer</title>
  </head>
  <body>
    <main class="shell">
      <section class="panel">
        <h1>Coolstuff Platformer</h1>
        <p>Move with A/D or Arrow keys. Jump with W, Space, or Arrow Up. Press R to restart.</p>
      </section>
      <canvas id="game" width="960" height="540" aria-label="2D platformer game"></canvas>
    </main>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 5: Write CSS**

Create `/home/aaronlm/Documents/coolstuff1/src/styles.css`:

```css
:root {
  color: #f7f3df;
  background: #121622;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(circle at top, #243b68 0%, #121622 58%);
}

.shell {
  width: min(100vw, 1080px);
  padding: 24px;
}

.panel {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 12px;
}

h1 {
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
}

p {
  margin: 0;
  color: #cfd8ff;
}

canvas {
  display: block;
  width: 100%;
  max-width: 960px;
  aspect-ratio: 16 / 9;
  image-rendering: pixelated;
  border: 4px solid #f7d774;
  border-radius: 16px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
  background: #7ec8ff;
}
```

- [ ] **Step 6: Write temporary bootstrap**

Create `/home/aaronlm/Documents/coolstuff1/src/main.ts`:

```ts
import './styles.css';

const canvas = document.querySelector<HTMLCanvasElement>('#game');

if (!canvas) {
  throw new Error('Missing #game canvas');
}

const context = canvas.getContext('2d');

if (!context) {
  throw new Error('Canvas 2D context is unavailable');
}

context.fillStyle = '#7ec8ff';
context.fillRect(0, 0, canvas.width, canvas.height);
context.fillStyle = '#1e2a3a';
context.font = '32px sans-serif';
context.fillText('Platformer loading...', 300, 260);
```

- [ ] **Step 7: Install dependencies**

Run:

```bash
cd /home/aaronlm/Documents/coolstuff1 && npm install
```

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 8: Verify scaffold builds**

Run:

```bash
cd /home/aaronlm/Documents/coolstuff1 && npm run build
```

Expected: TypeScript and Vite build complete successfully.

---

### Task 2: Core Types and Level Data

**Files:**
- Create: `/home/aaronlm/Documents/coolstuff1/src/game/types.ts`
- Create: `/home/aaronlm/Documents/coolstuff1/src/game/level.ts`
- Create: `/home/aaronlm/Documents/coolstuff1/src/game/entities.ts`
- Create: `/home/aaronlm/Documents/coolstuff1/src/game/physics.test.ts`

- [ ] **Step 1: Write type definitions**

Create `/home/aaronlm/Documents/coolstuff1/src/game/types.ts`:

```ts
export const TILE = 48;
export const WORLD_GRAVITY = 2200;
export const MOVE_SPEED = 320;
export const JUMP_SPEED = 820;
export const ENEMY_SPEED = 90;
export const PLAYER_WIDTH = 34;
export const PLAYER_HEIGHT = 42;
export const ENEMY_SIZE = 36;
export const LEVEL_HEIGHT = 12;

export type TileKind = 'ground' | 'brick' | 'question' | 'used';
export type GameStatus = 'playing' | 'won' | 'lost';

export interface Vector {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Tile extends Rect {
  kind: TileKind;
  used?: boolean;
}

export interface Player extends Rect {
  velocity: Vector;
  grounded: boolean;
  invulnerableFor: number;
}

export interface Enemy extends Rect {
  velocity: Vector;
  alive: boolean;
}

export interface Coin extends Rect {
  collected: boolean;
}

export interface Goal extends Rect {}

export interface GameState {
  player: Player;
  tiles: Tile[];
  coins: Coin[];
  enemies: Enemy[];
  goal: Goal;
  cameraX: number;
  score: number;
  lives: number;
  timeLeft: number;
  status: GameStatus;
  message: string;
}

export interface Controls {
  left: boolean;
  right: boolean;
  jump: boolean;
  restart: boolean;
}

export function intersects(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}
```

- [ ] **Step 2: Write level data**

Create `/home/aaronlm/Documents/coolstuff1/src/game/level.ts`:

```ts
import { LEVEL_HEIGHT, TILE, type Coin, type Enemy, type Goal, type Tile } from './types';

const rows = [
  '........................................................................',
  '........................................................................',
  '........................................................................',
  '.............C......................C...............C....................',
  '...........BBB..............Q......BBB.............BBB...................',
  '.....................C..................................................',
  '......Q............BBBBB...................Q............................G',
  '.............................E.........................E.................',
  '.........................BBBBBBBB........................................',
  '..............E.................................BBBB.....................',
  'PPPPPPPPPPPPPPPP..PPPPPPPPPPPPPPPPPPPP..PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP',
  'PPPPPPPPPPPPPPPP..PPPPPPPPPPPPPPPPPPPP..PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP',
];

export const levelWidth = rows[0].length * TILE;
export const levelHeight = LEVEL_HEIGHT * TILE;

export function createLevel(): { tiles: Tile[]; coins: Coin[]; enemies: Enemy[]; goal: Goal } {
  const tiles: Tile[] = [];
  const coins: Coin[] = [];
  const enemies: Enemy[] = [];
  let goal: Goal = { x: levelWidth - TILE * 2, y: TILE * 6, width: TILE / 2, height: TILE * 4 };

  rows.forEach((row, yIndex) => {
    [...row].forEach((symbol, xIndex) => {
      const x = xIndex * TILE;
      const y = yIndex * TILE;

      if (symbol === 'P') {
        tiles.push({ x, y, width: TILE, height: TILE, kind: 'ground' });
      }

      if (symbol === 'B') {
        tiles.push({ x, y, width: TILE, height: TILE, kind: 'brick' });
      }

      if (symbol === 'Q') {
        tiles.push({ x, y, width: TILE, height: TILE, kind: 'question' });
      }

      if (symbol === 'C') {
        coins.push({ x: x + 14, y: y + 10, width: 20, height: 28, collected: false });
      }

      if (symbol === 'E') {
        enemies.push({ x: x + 6, y: y + 12, width: 36, height: 36, velocity: { x: -90, y: 0 }, alive: true });
      }

      if (symbol === 'G') {
        goal = { x: x + 18, y: y - TILE * 2, width: 18, height: TILE * 5 };
      }
    });
  });

  return { tiles, coins, enemies, goal };
}
```

- [ ] **Step 3: Write state factory**

Create `/home/aaronlm/Documents/coolstuff1/src/game/entities.ts`:

```ts
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
```

- [ ] **Step 4: Write initial tests**

Create `/home/aaronlm/Documents/coolstuff1/src/game/physics.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { createInitialState } from './entities';
import { TILE } from './types';

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
```

- [ ] **Step 5: Run tests**

Run:

```bash
cd /home/aaronlm/Documents/coolstuff1 && npm test
```

Expected: PASS for `createInitialState`.

---

### Task 3: Physics and Game Rules

**Files:**
- Create: `/home/aaronlm/Documents/coolstuff1/src/game/physics.ts`
- Modify: `/home/aaronlm/Documents/coolstuff1/src/game/physics.test.ts`

- [ ] **Step 1: Extend physics tests**

Replace `/home/aaronlm/Documents/coolstuff1/src/game/physics.test.ts` with:

```ts
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
```

- [ ] **Step 2: Run tests to verify failure**

Run:

```bash
cd /home/aaronlm/Documents/coolstuff1 && npm test
```

Expected: FAIL because `src/game/physics.ts` does not exist.

- [ ] **Step 3: Write physics implementation**

Create `/home/aaronlm/Documents/coolstuff1/src/game/physics.ts`:

```ts
import { ENEMY_SPEED, JUMP_SPEED, MOVE_SPEED, WORLD_GRAVITY, intersects, levelHeight, levelWidth, type Controls, type Enemy, type GameState, type Player, type Rect, type Tile } from './types';

function moveHorizontally(body: Player | Enemy, tiles: Tile[], dt: number): void {
  body.x += body.velocity.x * dt;

  for (const tile of tiles) {
    if (!intersects(body, tile)) {
      continue;
    }

    if (body.velocity.x > 0) {
      body.x = tile.x - body.width;
    } else if (body.velocity.x < 0) {
      body.x = tile.x + tile.width;
    }

    body.velocity.x = 0;
  }
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
      state.player.velocity.y === 0 &&
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

    const previousX = enemy.x;
    enemy.velocity.x = enemy.velocity.x === 0 ? -ENEMY_SPEED : enemy.velocity.x;
    moveHorizontally(enemy, state.tiles, dt);
    const hit = moveVertically(enemy, state.tiles, dt);

    if (enemy.x === previousX || hit === 'none') {
      enemy.velocity.x *= -1;
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

    const playerWasAbove = state.player.velocity.y > 0 && state.player.y + state.player.height - enemy.y < 18;

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
  checkGoalAndTimer(state, dt);

  state.cameraX = Math.max(0, Math.min(state.player.x - viewportWidth * 0.38, levelWidth - viewportWidth));
}
```

- [ ] **Step 4: Fix import source**

The physics implementation imports `levelHeight` and `levelWidth` from `types.ts`, but those are in `level.ts`. Replace the first import block in `/home/aaronlm/Documents/coolstuff1/src/game/physics.ts` with:

```ts
import { levelHeight, levelWidth } from './level';
import { ENEMY_SPEED, JUMP_SPEED, MOVE_SPEED, WORLD_GRAVITY, intersects, type Controls, type Enemy, type GameState, type Player, type Tile } from './types';
```

- [ ] **Step 5: Run physics tests**

Run:

```bash
cd /home/aaronlm/Documents/coolstuff1 && npm test
```

Expected: PASS.

---

### Task 4: Rendering and Game Loop

**Files:**
- Create: `/home/aaronlm/Documents/coolstuff1/src/game/input.ts`
- Create: `/home/aaronlm/Documents/coolstuff1/src/game/renderer.ts`
- Create: `/home/aaronlm/Documents/coolstuff1/src/game/game.ts`
- Modify: `/home/aaronlm/Documents/coolstuff1/src/main.ts`

- [ ] **Step 1: Write input handler**

Create `/home/aaronlm/Documents/coolstuff1/src/game/input.ts`:

```ts
import type { Controls } from './types';

const pressed = new Set<string>();

export function bindInput(): Controls {
  const controls: Controls = { left: false, right: false, jump: false, restart: false };

  function sync(): void {
    controls.left = pressed.has('ArrowLeft') || pressed.has('KeyA');
    controls.right = pressed.has('ArrowRight') || pressed.has('KeyD');
    controls.jump = pressed.has('ArrowUp') || pressed.has('KeyW') || pressed.has('Space');
    controls.restart = pressed.has('KeyR');
  }

  window.addEventListener('keydown', (event) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'].includes(event.code)) {
      event.preventDefault();
    }

    pressed.add(event.code);
    sync();
  });

  window.addEventListener('keyup', (event) => {
    pressed.delete(event.code);
    sync();
  });

  return controls;
}
```

- [ ] **Step 2: Write renderer**

Create `/home/aaronlm/Documents/coolstuff1/src/game/renderer.ts`:

```ts
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
```

- [ ] **Step 3: Write game loop**

Create `/home/aaronlm/Documents/coolstuff1/src/game/game.ts`:

```ts
import { createInitialState } from './entities';
import { bindInput } from './input';
import { updateGameState } from './physics';
import { render } from './renderer';

export function startGame(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas 2D context is unavailable');
  }

  const controls = bindInput();
  let state = createInitialState();
  let lastTime = performance.now();
  let restartWasPressed = false;

  function frame(now: number): void {
    const dt = Math.min((now - lastTime) / 1000, 1 / 30);
    lastTime = now;

    if (controls.restart && !restartWasPressed) {
      state = createInitialState();
    }
    restartWasPressed = controls.restart;

    updateGameState(state, controls, dt, canvas.width);
    render(context, state, canvas.width, canvas.height);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
```

- [ ] **Step 4: Replace main bootstrap**

Replace `/home/aaronlm/Documents/coolstuff1/src/main.ts` with:

```ts
import './styles.css';
import { startGame } from './game/game';

const canvas = document.querySelector<HTMLCanvasElement>('#game');

if (!canvas) {
  throw new Error('Missing #game canvas');
}

startGame(canvas);
```

- [ ] **Step 5: Build and test**

Run:

```bash
cd /home/aaronlm/Documents/coolstuff1 && npm test && npm run build
```

Expected: tests pass and Vite build succeeds.

---

### Task 5: Manual Play Verification

**Files:**
- No code changes expected.

- [ ] **Step 1: Start local dev server**

Run:

```bash
cd /home/aaronlm/Documents/coolstuff1 && npm run dev
```

Expected: Vite prints a local URL.

- [ ] **Step 2: Verify gameplay in browser**

Open the Vite URL and verify:
- A/D and Arrow keys move the player.
- W, Space, and Arrow Up jump.
- Camera scrolls as the player moves right.
- Coins disappear and increase score.
- Question blocks become used and create a coin when hit from below.
- Falling into pits reduces lives.
- Stomping enemies removes them and bounces the player.
- Touching enemies from the side reduces lives.
- Touching the flag shows a win screen.
- Pressing R restarts the level.

- [ ] **Step 3: Stop local dev server**

Stop the dev server with `Ctrl+C` after verification.

---

## Self-Review

- Spec coverage: scaffold, TypeScript/Vite, canvas rendering, player controls, physics, coins, question blocks, enemies, pits, HUD, timer, goal, restart, and build/test verification are covered.
- Placeholder scan: no placeholder steps remain.
- Type consistency: `GameState`, `Controls`, entity types, `createInitialState`, `updateGameState`, `render`, and `startGame` are consistently named across tasks.
