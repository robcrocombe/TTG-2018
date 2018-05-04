export default class Drawable {
  public width: number;
  public height: number;
  public pos: Point;

  constructor(inWidth: number, inHeight: number, inPosition: Point) {
    this.width = inWidth;
    this.height = inHeight;

    this.pos = inPosition;
  }
}
