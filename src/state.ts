import Radar from './gameobjects/radar';
import Player from './gameobjects/player';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const player = new Player(100, 50, { x: 400, y: 300 });

const radar = new Radar(300, 300, { x: 200, y: 300 });

export function update(delta: number) {
  player.update(delta);
  radar.update(delta);
}

export function draw(fps: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.draw(ctx);
  radar.draw(ctx);
}
