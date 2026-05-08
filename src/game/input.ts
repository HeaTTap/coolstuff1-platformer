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
