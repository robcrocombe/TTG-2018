import Drawable from '../primitives/drawable';

export default class Radar extends Drawable {
  private indicatorAngle;
  private indicatorLineEnd: Point;
  private bleeps: Point[];

  constructor(inWidth: number, inHeight: number, inPosition: Point) {
    super(inWidth, inHeight, inPosition);
    this.indicatorLineEnd = { x: 135, y: 135 };
    this.indicatorAngle = 285;
  }

  public update(delta: number, enemies: Drawable[]) {
    const speed = 0.03;
    let newAngle = this.indicatorAngle + speed;
    this.indicatorAngle = newAngle;

    this.indicatorLineEnd.x = this.pos.x + Math.cos(newAngle) * this.width * 0.45;
    this.indicatorLineEnd.y = this.pos.y + Math.sin(newAngle) * this.width * 0.45;

    this.bleeps = enemies.map(enemy => enemy.pos);
  }

  public draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.strokeStyle = '#5fc345';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.width * 0.45, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.width * 0.35, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.width * 0.25, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.width * 0.15, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.width * 0.05, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(this.indicatorLineEnd.x, this.indicatorLineEnd.y);
    ctx.stroke();

    ctx.translate(this.pos.x - this.width / 4, this.pos.y);
    ctx.scale(0.1, 0.1);
    if (this.bleeps) {
      this.bleeps.forEach(bleep => {
        ctx.fillStyle = '#5fc345';
        ctx.beginPath();
        ctx.arc(bleep.x, bleep.y, this.width * 0.2, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    ctx.restore();
  }
}
