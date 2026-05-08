import { createInitialState } from './entities';
import { bindInput } from './input';
import { updateGameState } from './physics';
import { render } from './renderer';

export function startGame(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas 2D context is unavailable');
  }

  const renderingContext: CanvasRenderingContext2D = context;
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
    render(renderingContext, state, canvas.width, canvas.height);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
