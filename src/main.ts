import './styles.css';
import { startGame } from './game/game';

const canvas = document.querySelector<HTMLCanvasElement>('#game');

if (!canvas) {
  throw new Error('Missing #game canvas');
}

startGame(canvas);
