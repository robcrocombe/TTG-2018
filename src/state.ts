import Radar from './gameobjects/radar';
import Light from './light/light';
import Mouse from './mouse';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const radar = new Radar(300, 300, { x: 200, y: 300 });
const light = new Light(canvas, ctx);
const mouse = new Mouse(canvas);

export function update(delta: number) {
  radar.update(delta);
  light.update(delta, mouse);
}

export function draw(fps: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  radar.draw(ctx);
  light.draw();
}
