import Drawable from '../primitives/drawable';
import Mouse from '../mouse';

export default class Light extends Drawable {
  angle = 0;
  intensity = 500;

  public update(delta: number, mouse: Mouse) {
    const targetX = mouse.pos.x - this.pos.x;
    const targetY = mouse.pos.y - this.pos.y;
    const rotation = Math.atan2(targetY, targetX);

    this.angle = -(Math.PI * 0.5 - rotation);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    const triangleY = this.pos.y + this.intensity;

    const grd = ctx.createLinearGradient(
      this.pos.x,
      triangleY,
      this.pos.x,
      triangleY + this.height
    );
    grd.addColorStop(0, 'rgba(142,214,255, 0.7)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.drawTriangle(ctx, this.pos.x, triangleY, this.width, this.height, grd);
  }

  private drawTriangle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    triangleWidth: number,
    triangleHeight: number,
    fill: CanvasGradient
  ) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, 1, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // ctx.save();
    // ctx.fillStyle = '#fff';
    // ctx.font = '30px Arial';
    // ctx.fillText(this.angle.toString(), 10, 50);
    // ctx.restore();

    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.angle);
    ctx.translate(-this.pos.x, -this.pos.y);
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(x + triangleWidth / 2, y + triangleHeight);
    ctx.lineTo(x - triangleWidth / 2, y + triangleHeight);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.restore();
  }
}
