import Mouse from '../mouse';

export default class Light {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly width = 380;
  readonly height = 500;
  angle: number = 0;
  pos: Point;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.pos = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };
  }

  public update(delta: number, mouse: Mouse) {
    const targetX = mouse.pos.x - this.pos.x;
    const targetY = mouse.pos.y - this.pos.y;
    const rotation = Math.atan2(targetY, targetX);

    this.angle = -(Math.PI * 0.5 - rotation);
  }

  public draw() {
    const triangleY = this.canvas.height / 2 - this.width / 6;

    const grd = this.ctx.createLinearGradient(
      this.pos.x,
      triangleY,
      this.pos.x,
      triangleY + this.height
    );
    grd.addColorStop(0, '#8ed6ff');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.drawTriangle(this.pos.x, triangleY, this.width, this.height, grd);
  }

  private drawTriangle(
    x: number,
    y: number,
    triangleWidth: number,
    triangleHeight: number,
    fill: CanvasGradient
  ) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, 1, 0, 2 * Math.PI);
    this.ctx.strokeStyle = '#ff0000';
    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.restore();

    // this.ctx.save();
    // this.ctx.fillStyle = '#fff';
    // this.ctx.font = '30px Arial';
    // this.ctx.fillText(this.angle.toString(), 10, 50);
    // this.ctx.restore();

    this.ctx.save();
    this.ctx.translate(this.pos.x, this.pos.y);
    this.ctx.rotate(this.angle);
    this.ctx.translate(-this.pos.x, -this.pos.y);
    this.ctx.beginPath();
    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.ctx.lineTo(x + triangleWidth / 2, y + triangleHeight);
    this.ctx.lineTo(x - triangleWidth / 2, y + triangleHeight);
    this.ctx.closePath();
    this.ctx.fillStyle = fill;
    this.ctx.fill();
    this.ctx.restore();
  }
}
