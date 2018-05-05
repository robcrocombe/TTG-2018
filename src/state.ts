import Radar from './game-objects/radar';
import Enemy, { EnemyType } from './game-objects/enemy';
import Player from './game-objects/player';
import Mouse from './mouse';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const player = new Player(0.11, { x: 400, y: 10 });
const radar = new Radar(300, 300, { x: 200, y: 300 });
const mouse = new Mouse(canvas);
const enemies = [
  new Enemy({ x: 2000, y: 200 }, EnemyType.Shark),
  new Enemy({ x: 2000, y: 10 }, EnemyType.BigFish),
];

window.addEventListener('resize', resizeCanvas, false);

export function update(delta: number) {
  radar.update(delta, enemies);
  player.update(delta, canvas.height, mouse);

  enemies.forEach(enemy => {
    enemy.update(delta, mouse);
  });
}

export function draw(fps: number) {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  enemies.forEach(enemy => {
    enemy.draw(ctx);
  });

  player.draw(ctx);

  radar.draw(ctx, canvas);

  ctx.font = '38px sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('HEALTH: ' + player.health, 10, 50);

  ctx.restore();
}

resizeCanvas();

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (radar) {
    radar.pos.x = window.innerWidth - 150;
    radar.pos.y = window.innerHeight - 150;
  }
}
