# Mario-Inspired Platformer Design

## Context
Build a multi-file TypeScript/Vite browser game in `/home/aaronlm/Documents/coolstuff1/`. The game should be a Super Mario-inspired 2D side-scrolling platformer while using original visuals and code.

## Scope
The game will be a playable single-level canvas platformer with:
- Player movement, running, jumping, and gravity.
- Side-scrolling camera.
- Solid terrain, platforms, pits, and a goal flag.
- Coins, question blocks, stompable enemies, lives, timer, and score/HUD.
- Win/lose/restart states.

## Architecture
Use Vite with TypeScript and HTML canvas. The project will be split into focused modules under `src/game/`:
- `types.ts`: shared game types and constants.
- `input.ts`: keyboard input state.
- `level.ts`: level tile/entity data.
- `entities.ts`: player, enemies, coins, blocks, and goal objects.
- `physics.ts`: movement, gravity, collisions, stomps, hazards, and pickups.
- `renderer.ts`: canvas drawing and camera transform.
- `game.ts`: main loop, state transitions, update/render orchestration.
- `main.ts`: DOM bootstrapping.

## User Experience
The game runs with `npm install` then `npm run dev`. The page shows controls, a canvas, and HUD. Keyboard controls: arrows/A/D to move, Space/W/ArrowUp to jump, R to restart.

## Testing and Verification
- `npm install`
- `npm run build`
- `npm run dev`
- Verify in browser: player moves/jumps, camera scrolls, coins increment, question blocks spawn rewards once, enemies can be stomped, pits cost lives, timer counts down, flag wins, restart works.

## Constraints
Do not use copyrighted Mario assets. Visuals will be simple original pixel-art-like shapes drawn in canvas.
