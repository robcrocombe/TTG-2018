import Drawable from '../primitives/drawable';
import Keydown from '../keys';
import Light from './light';
import Mouse from '../mouse';

export default class Player extends Drawable {
  img: HTMLImageElement;

  constructor(scale: number, inPosition: Point) {
    super(0, 0, inPosition);
    this.img = new Image();
    this.img.src = '/assets/player.svg';

    this.img.onload = () => {
      const inWidth = this.img.width * scale;
      const inHeight = this.img.height * scale;
      this.width = inWidth;
      this.height = inHeight;
    };
  }

  private light = new Light(380, 500, { x: 0, y: 0 });

  private targetY: number = 10;
  private buoyancy: number = 0.2;
  private balast: number = 0.5;

  public update(delta: number, maxDepth: number, mouse: Mouse) {
    if (Keydown.space && this.pos.y + this.height < maxDepth) {
      this.pos.y += this.balast * delta;
    }

    if (this.pos.y > this.targetY) {
      this.pos.y -= this.buoyancy * delta;
    }

    this.light.pos.x = this.pos.x + this.width;
    this.light.pos.y = this.pos.y + this.height / 2;

    this.light.update(delta, mouse);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.light.draw(ctx);

    ctx.save();
    ctx.fillStyle = '#595d63';
    ctx.strokeStyle = '#595d63';
    ctx.lineWidth = 3;

    ctx.beginPath();
    // ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
