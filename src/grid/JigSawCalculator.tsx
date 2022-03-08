import { PositionType } from 'shapes/Cell';
import { JigSawPiece, JigSawSegmentType } from 'shapes/JigSaw';

var seedrandom = require('seedrandom');

export class JigSawCalculator {
  private random;

  constructor(seed: string = 'abc') {
    this.random = new seedrandom(seed);
  }

  public getNewPiece(positionType: PositionType, left: JigSawPiece, above: JigSawPiece) {
    switch (positionType) {
      case PositionType.TOP_LEFT:
        return new JigSawPiece(
          JigSawSegmentType.WALL,
          JigSawSegmentType.WALL,
          this.getRandomEdge(),
          this.getRandomEdge()
        );
      case PositionType.TOP_RIGHT:
        return new JigSawPiece(
          this.getFit(left.right),
          JigSawSegmentType.WALL,
          JigSawSegmentType.WALL,
          this.getRandomEdge()
        );
      case PositionType.BOTTOM_RIGHT:
        return new JigSawPiece(
          this.getFit(left.right),
          this.getFit(above.bottom),
          JigSawSegmentType.WALL,
          JigSawSegmentType.WALL
        );
      case PositionType.BOTTOM_LEFT:
        return new JigSawPiece(
          JigSawSegmentType.WALL,
          this.getFit(above.bottom),
          this.getRandomEdge(),
          JigSawSegmentType.WALL
        );
      case PositionType.LEFT:
        return new JigSawPiece(
          JigSawSegmentType.WALL,
          this.getFit(above.bottom),
          this.getRandomEdge(),
          this.getRandomEdge()
        );
      case PositionType.TOP:
        return new JigSawPiece(
          this.getFit(left.right),
          JigSawSegmentType.WALL,
          this.getRandomEdge(),
          this.getRandomEdge()
        );
      case PositionType.RIGHT:
        return new JigSawPiece(
          this.getFit(left.right),
          this.getFit(above.bottom),
          JigSawSegmentType.WALL,
          this.getRandomEdge()
        );
      case PositionType.BOTTOM:
        return new JigSawPiece(
          this.getFit(left.right),
          this.getFit(above.bottom),
          this.getRandomEdge(),
          JigSawSegmentType.WALL
        );
      case PositionType.MIDDLE:
        return new JigSawPiece(
          this.getFit(left.right),
          this.getFit(above.bottom),
          this.getRandomEdge(),
          this.getRandomEdge()
        );
    }
  }

  private getRandomEdge() {
    return this.random() >= 0.5 ? JigSawSegmentType.CONCAVE : JigSawSegmentType.CONVEX;
  }

  private getFit(type: JigSawSegmentType) {
    switch (type) {
      case JigSawSegmentType.CONCAVE:
        return JigSawSegmentType.CONVEX;
      case JigSawSegmentType.CONVEX:
        return JigSawSegmentType.CONCAVE;
      case JigSawSegmentType.WALL:
        return JigSawSegmentType.WALL;
    }
  }
}
