import Radar from './gameobjects/radar';
import Enemy, { EnemyType } from './gameobjects/enemy';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const radar = new Radar(300, 300, { x: 200, y: 300 });

export function update(delta: number) {
  const enemies = [
    new Enemy({ x: 1, y: 1 }, EnemyType.Shark),
    new Enemy({ x: 2, y: 2 }, EnemyType.BigFish),
  ];

  radar.update(delta, enemies);
}

export function draw(fps: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  radar.draw(ctx);
}
