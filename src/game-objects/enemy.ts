import Drawable from '../primitives/drawable';
import Mouse from '../mouse';

export enum EnemyType {
  Shark,
  BigFish,
}

export default class Enemy extends Drawable {
  public type: EnemyType;
  private speed: number = 0;
  private visible: boolean;
  private img: HTMLImageElement;

  constructor(inPosition: Point, type: EnemyType) {
    super(0, 0, inPosition);

    this.img = new Image();
    this.img.src = './assets/shark.svg';

    this.img.onload = () => {
      switch (type) {
        case EnemyType.Shark:
          this.width = this.img.width * 0.1;
          this.height = this.img.height * 0.1;
          this.speed = 0.2;
          break;
        case EnemyType.BigFish:
          this.width = this.img.width * 0.05;
          this.height = this.img.height * 0.05;
          this.speed = 0.1;
          break;
      }
    };
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
      ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
      ctx.restore();
    }
  }
}
