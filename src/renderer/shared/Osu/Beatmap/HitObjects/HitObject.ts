import { SerializableObject } from '../../../utils/SerializableObject';

export enum HitObjectType {
  Circle = 1 << 0,
  Slider = 1 << 1,
  NewCombo = 1 << 2,
  Spinner = 1 << 3,
  /** idk */
  Skip1 = 1 << 4,
  /** also idk */
  Skip2 = 1 << 5,
  /** and also idk */
  Skip4 = 1 << 6,
  Hold = 1 << 7,
}

export interface HitObject extends SerializableObject {
  x: number;
  y: number;
  time: number;
  type: number;
  hitSound: number;
  hitSample?: string;
}

export class HitObjectImpl implements HitObject {
  x: number;
  y: number;
  time: number;
  type: number;
  hitSound: number;
  hitSample?: string | undefined;

  constructor(params: {
    x: number;
    y: number;
    time: number;
    type: number;
    hitSound: number;
    hitSample?: string | undefined;
  }) {
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
      this.hitSample,
    ];

    return params.filter((x) => x !== undefined && x !== null).join(',');
  }
}
