import Drawable from '../primitives/drawable';

export default class Player extends Drawable {
  constructor(inWidth: number, inHeight: number, inPosition: Point) {
    super(inWidth, inHeight, inPosition);
  }

  public update(delta: number) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#4e5156';
    ctx.strokeStyle = '#595d63';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.rect(this.position.x, this.position.y, this.width, this.height);
    ctx.stroke();
    ctx.fill();
  }
}
