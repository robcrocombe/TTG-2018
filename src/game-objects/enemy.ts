import Drawable from '../primitives/drawable';
import Mouse from '../mouse';

export enum EnemyType {
  Shark,
  BigFish,
}

export default class Enemy extends Drawable {
  public type: EnemyType;
  private speed: number;
  private visible: boolean;

  constructor(inPosition: Point, type: EnemyType) {
    let width = 0;
    let height = 0;
    let speed = 0;

    switch (type) {
      case EnemyType.Shark:
        width = 200;
        height = 30;
        speed = 0.2;
        break;
      case EnemyType.BigFish:
        width = 200;
        height = 200;
        speed = 0.1;
        break;
    }

    super(width, height, inPosition);
    this.speed = speed;
  }

  public update(delta: number, mouse: Mouse) {
    if (this.pos.x + this.width < 0) {
      this.pos.x = 2000;
    }

    this.pos.x -= this.speed * delta;

    if (mouse.intersects(this.pos.x, this.pos.y, this.width, this.height)) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.visible) {
      ctx.save();
      ctx.fillStyle = '#ffa500';
      ctx.beginPath();
      ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  }
}
