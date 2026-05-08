import { ENEMY_SPEED, LEVEL_HEIGHT, TILE, type Coin, type Enemy, type Goal, type Tile } from './types';

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
        enemies.push({ x: x + 6, y: y + 12, width: 36, height: 36, velocity: { x: -ENEMY_SPEED, y: 0 }, alive: true });
      }

      if (symbol === 'G') {
        goal = { x: x + 18, y: y - TILE * 2, width: 18, height: TILE * 5 };
      }
    });
  });

  return { tiles, coins, enemies, goal };
}
