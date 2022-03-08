import { MIN_CELL_HEIGHT_JIGSAW } from "Constants";
import { RectangleDimensions } from "./RectangleDimensions";


export class JigSawDimensions extends RectangleDimensions {
    
  public static getMinCellHeight() {
    return MIN_CELL_HEIGHT_JIGSAW;
  }
}