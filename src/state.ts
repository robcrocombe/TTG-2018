const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

export function update(delta: number) {}

export function draw(fps: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
