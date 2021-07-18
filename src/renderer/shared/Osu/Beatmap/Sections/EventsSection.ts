/**
 * BeatmapEvent syntax: eventType,startTime,eventParams
 */
export interface BeatmapEvent {
  eventType: string | number;
  startTime: number;

  serialize(): string;
}

/**
 * Background syntax: 0,0,filename,xOffset,yOffset
 */
export class EventBackground implements BeatmapEvent {
  eventType;
  startTime;
  filename: string;
  xOffset: number;
  yOffset: number;

  constructor(filename: string, xOffset: number, yOffset: number) {
    this.eventType = 0;
    this.startTime = 0;
    this.filename = filename;
    this.xOffset = isNaN(xOffset) ? 0 : xOffset;
    this.yOffset = isNaN(yOffset) ? 0 : yOffset;
  }

  serialize(): string {
    return `0,0,${this.filename},${this.xOffset},${this.yOffset}`;
  }
}

/**
 * Video syntax: Video,startTime,filename,xOffset,yOffset
 */
export class EventVideo implements BeatmapEvent {
  eventType: 'Video' | 1;
  startTime: number;
  filename: string;
  xOffset: number;
  yOffset: number;

  constructor(
    startTime: number,
    filename: string,
    xOffset: number,
    yOffset: number
  ) {
    this.eventType = 1;
    this.startTime = startTime;
    this.filename = filename;
    this.xOffset = isNaN(xOffset) ? 0 : xOffset;
    this.yOffset = isNaN(yOffset) ? 0 : yOffset;
  }

  serialize(): string {
    return `1,${this.startTime},${this.filename},${this.xOffset},${this.yOffset}`;
  }
}

/**
 * Break syntax: 2,startTime,endTime
 */
export class EventBreak implements BeatmapEvent {
  eventType: 'Break' | 2;
  startTime: number = 0;
  endTime: number = 0;

  constructor(startTime: number, endTime: number) {
    this.eventType = 2;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  serialize(): string {
    return `2,${this.startTime},${this.endTime}`;
  }
}

export interface StoryboardEvent {
  type: string;
  layer: number | string;
  origin: number | string;
  filepath: string;
  x: number;
  y: number;
  commands: StoryboardCommand[];
}

export interface StoryboardSprite extends StoryboardEvent {
  type: 'Sprite';
}

export interface StoryboardAnimation extends StoryboardEvent {
  type: 'Animation';
  frameCount: number;
  frameDelay: number;
  looptype: 'LoopForever' | 'LoopOnce';
}

// Sample,<time>,<layer_num>,"<filepath>",<volume>
export interface StoryboardAudio {
  type: 'Sample';
  time: number;
  layerNum: number | string;
  filepath: string;
  volume: number;
}

export interface StoryboardCommand {
  event: string;
  easing: number | string;
  starttime: number;
  endtime: number;
  params: string[];
}

// TODO: https://osu.ppy.sh/wiki/en/Storyboard_Scripting
export interface EventStoryboard extends BeatmapEvent {}
