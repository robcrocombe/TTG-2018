import Radar from './gameobjects/radar';
import Player from './gameobjects/player';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const player = new Player(200, 100, { x: 400, y: 50 });
const radar = new Radar(300, 300, { x: 200, y: 300 });

export function update(delta: number) {
  radar.update(delta);
  player.update(delta);
}

export function draw(fps: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);

  radar.draw(ctx);
}
