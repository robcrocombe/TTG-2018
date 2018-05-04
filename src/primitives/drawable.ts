export default class Drawable {
  protected width: number;
  protected height: number;

  protected pos: Point;

  constructor(inWidth: number, inHeight: number, inPosition: Point) {
    this.width = inWidth;
    this.height = inHeight;

    this.pos = inPosition;
  }
}
