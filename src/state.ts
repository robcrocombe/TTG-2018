import Radar from './gameobjects/radar';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const radar = new Radar(300, 300, { x: 200, y: 300 });

export function update(delta: number) {
  radar.update(delta);
}

export function draw(fps: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  radar.draw(ctx);
}
