import Radar from './game-objects/radar';
import Enemy, { EnemyType } from './game-objects/enemy';
import Player from './game-objects/player';
import Light from './game-objects/light';
import Mouse from './mouse';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(100, 50, { x: 400, y: 300 });
const radar = new Radar(300, 300, { x: 200, y: 300 });
const light = new Light(380, 500, { x: canvas.width / 2, y: canvas.height / 2 });
const mouse = new Mouse(canvas);
const enemies = [
  new Enemy({ x: 300, y: 200 }, EnemyType.Shark),
  new Enemy({ x: 10, y: 10 }, EnemyType.BigFish),
];

window.addEventListener('resize', resizeCanvas, false);

export function update(delta: number) {
  radar.update(delta, enemies);
  player.update(delta);
  light.update(delta, mouse);
  enemies.forEach(enemy => {
    enemy.update(delta);
  });
}

export function draw(fps: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  light.draw(ctx);
  radar.draw(ctx);

  enemies.forEach(enemy => {
    enemy.draw(ctx);
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
