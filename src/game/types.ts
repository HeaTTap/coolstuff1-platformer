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
