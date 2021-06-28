import { HitObject } from './HitObject';

export interface HitObjectSlider extends HitObject {
  curveType: 'B' | 'C' | 'L' | 'P';
  curvePoints: { x: number; y: number }[];
  slides: number;
  length: number;
  edgeSounds: number[] | null;
  edgeSets?: { normalSet: number; additionSet: number }[] | null;
}

export class HitObjectSliderImpl implements HitObjectSlider {
  curveType: 'B' | 'C' | 'L' | 'P';
  curvePoints: { x: number; y: number }[];
  slides: number;
  length: number;
  edgeSounds: number[] | null;
  edgeSets?: { normalSet: number; additionSet: number }[] | null | undefined;
  x: number;
  y: number;
  time: number;
  type: number;
  hitSound: number;
  hitSample?: string | undefined;

  constructor(params: {
    curveType: 'B' | 'C' | 'L' | 'P';
    curvePoints: { x: number; y: number }[];
    slides: number;
    length: number;
    edgeSounds: number[] | null;
    edgeSets?: { normalSet: number; additionSet: number }[] | null | undefined;
    x: number;
    y: number;
    time: number;
    type: number;
    hitSound: number;
    hitSample?: string | undefined;
  }) {
    this.curveType = params.curveType;
    this.curvePoints = params.curvePoints;
    this.slides = params.slides;
    this.length = params.length;
    this.edgeSounds = params.edgeSounds;
    this.edgeSets = params.edgeSets;
    this.x = params.x;
    this.y = params.y;
    this.time = params.time;
    this.type = params.type;
    this.hitSound = params.hitSound;
    this.hitSample = params.hitSample;
  }

  serialize(): string {
    const params = [
      this.x,
      this.y,
      Math.round(this.time),
      this.type,
      this.hitSound,
      this.curveType +
        '|' +
        this.curvePoints.map((p) => p.x + ':' + p.y).join('|'),
      this.slides,
      this.length,
      this.edgeSounds?.join('|'),
      this.edgeSets?.map((p) => p.normalSet + ':' + p.additionSet).join('|'),
      this.hitSample,
    ];

    return params.filter((x) => x !== undefined && x !== null).join(',');
  }
}
