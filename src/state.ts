import Radar from './game-objects/radar';
import Enemy, { EnemyType } from './game-objects/enemy';
import Player from './game-objects/player';
import Mouse from './mouse';

const screenCanvas = document.getElementById('canvas') as HTMLCanvasElement;
const worldCanvas = document.createElement('canvas') as HTMLCanvasElement;
const screenContext = screenCanvas.getContext('2d');
const worldContext = worldCanvas.getContext('2d');

const player = new Player(100, 50, { x: 400, y: 10 });
const radar = new Radar(300, 300, { x: 200, y: 300 });
const mouse = new Mouse(worldCanvas);
const enemies = [
  new Enemy({ x: 300, y: 200 }, EnemyType.Shark),
  new Enemy({ x: 10, y: 10 }, EnemyType.BigFish),
];

window.addEventListener('resize', resizeCanvas, false);

export function update(delta: number) {
  radar.update(delta, enemies);
  player.update(delta, worldCanvas.height, mouse);
  enemies.forEach(enemy => {
    enemy.update(delta);
  });
}

export function draw(fps: number) {
  screenContext.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

  player.draw(worldContext);
  radar.draw(screenContext);

  enemies.forEach(enemy => {
    enemy.draw(worldContext);
  });
}

resizeCanvas();

function resizeCanvas() {
  screenCanvas.width = window.innerWidth;
  screenCanvas.height = window.innerHeight;

  if (radar) {
    radar.pos.x = window.innerWidth - 150;
    radar.pos.y = window.innerHeight - 150;
  }
}
