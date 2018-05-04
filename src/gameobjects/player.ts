import Drawable from '../primitives/drawable';
import Keydown from '../keys';

export default class Player extends Drawable {
  constructor(inWidth: number, inHeight: number, inPosition: Point) {
    super(inWidth, inHeight, inPosition);
  }

  private targetY: number = 10;
  private buoyancy: number = 0.2;
  private balast: number = 0.5;

  public update(delta: number) {
    if (Keydown.space) {
      this.position.y += this.balast * delta;
    }

    if (this.position.y > this.targetY) {
      this.position.y -= this.buoyancy * delta;
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#595d63';
    ctx.strokeStyle = '#595d63';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}
