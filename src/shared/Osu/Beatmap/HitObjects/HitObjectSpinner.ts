import { HitObject } from './HitObject';

export interface HitObjectSpinner extends HitObject {
  endTime: number;
}

export class HitObjectSpinnerImpl implements HitObjectSpinner {
  endTime: number;
  x: number;
  y: number;
  time: number;
  type: number;
  hitSound: number;
  hitSample?: string | undefined;

  constructor(params: {
    endTime: number;
    x: number;
    y: number;
    time: number;
    type: number;
    hitSound: number;
    hitSample?: string | undefined;
  }) {
    this.endTime = params.endTime;
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
      Math.round(this.endTime),
      this.hitSample,
    ];

    return params.filter((x) => x !== undefined && x !== null).join(',');
  }
}
