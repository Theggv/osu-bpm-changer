export default interface EditorSection {
  /**
   * Time in milliseconds of bookmarks
   */
  Bookmarks: number[];
  /**
   * Distance snap multiplier
   */
  DistanceSpacing: number;
  /**
   * Beat snap divisor
   */
  BeatDivisor: number;
  /**
   * Grid size
   */
  GridSize: number;
  /**
   * Scale factor for the object timeline
   */
  TimelineZoom: number;
}

export class EditorSectionDefault implements EditorSection {
  Bookmarks: number[] = [];
  DistanceSpacing: number = 1;
  BeatDivisor: number = 1;
  GridSize: number = 4;
  TimelineZoom: number = 1;
}
