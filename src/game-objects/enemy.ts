import Drawable from '../primitives/drawable';

export enum EnemyType {
  Shark,
  BigFish,
}

export default class Enemy extends Drawable {
  public type: EnemyType;

  constructor(inPosition: Point, type: EnemyType) {
    let width = 0;
    let height = 0;

    switch (type) {
      case EnemyType.Shark:
        width = 200;
        height = 30;
        break;
      case EnemyType.BigFish:
        width = 200;
        height = 200;
        break;
    }

    super(width, height, inPosition);
  }

  public update(delta: number) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#ffa500';
    ctx.beginPath();
    ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
    ctx.stroke();
    ctx.fill();
  }
}
