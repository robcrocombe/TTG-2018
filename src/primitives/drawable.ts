export default class Drawable {
  protected width: number;
  protected height: number;

  protected position: Point;

  constructor(inWidth: number, inHeight: number, inPosition: Point) {
    this.width = inWidth;
    this.height = inHeight;

    this.position = inPosition;
  }
}
