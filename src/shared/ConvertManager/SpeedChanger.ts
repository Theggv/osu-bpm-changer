import { Beatmap, TimingPoint } from '../Osu/Beatmap';
import { EventBreak } from '../Osu/Beatmap/Sections/EventsSection';
import { HitObjectType } from '../Osu/Beatmap/HitObjects/HitObject';
import { HitObjectHold } from '../Osu/Beatmap/HitObjects/HitObjectHold';
import { HitObjectSpinner } from '../Osu/Beatmap/HitObjects/HitObjectSpinner';

export interface BPMAnalytics {
  min: number;
  max: number;
  mean: number;
}

/**
 *
 * @param bm
 * @param bpm
 * @throws Error
 */
export const changeBPM = (bm: Beatmap, bpm: number) => {
  const currentBPM = analyzeBPM(bm).mean;

  const multiplier = bpm / currentBPM;

  multiplyBPM(bm, multiplier);
};

/**
 *
 * @param bm
 * @param bpm
 * @throws Error
 */
export const multiplyBPM = (bm: Beatmap, multiplier: number) => {
  if (!multiplier) {
    throw new Error("multiplier can't be 0");
  }

  bm.general.PreviewTime = Math.round(bm.general.PreviewTime / multiplier);

  if (bm.timingPoints) {
    bm.timingPoints.forEach((value, index, arr) => {
      arr[index].time = arr[index].time / multiplier;

      if (value.uninherited)
        arr[index].beatLength = arr[index].beatLength / multiplier;
    });
  }

  bm.hitObjects.forEach((value, index, arr) => {
    arr[index].time = arr[index].time / multiplier;

    if (value.type & HitObjectType.Spinner)
      (arr[index] as HitObjectSpinner).endTime =
        (arr[index] as HitObjectSpinner).endTime / multiplier;

    if (value.type & HitObjectType.Hold)
      (arr[index] as HitObjectHold).endTime =
        (arr[index] as HitObjectHold).endTime / multiplier;
  });

  bm.editor.Bookmarks = bm.editor.Bookmarks.map((x) => x / multiplier);

  bm.events.forEach((value, index, arr) => {
    arr[index].startTime = Math.round(arr[index].startTime / multiplier);

    if (value as EventBreak) {
      (arr[index] as EventBreak).endTime = Math.round(
        (arr[index] as EventBreak).endTime / multiplier
      );
    }
  });
};

/**
 * Function to calculate main bpm
 *
 * @param bm Beatmap
 */
export const analyzeBPM = (bm: Beatmap): BPMAnalytics => {
  if (!bm.timingPoints || !bm.timingPoints.length)
    return { min: 0, max: 0, mean: 0 };

  const map = new Map<number, number>();

  let diff = 0;
  let lastBPM = -1;
  let lastPoint: TimingPoint | null = null;

  const lastNote = bm.hitObjects[bm.hitObjects.length - 1];

  for (let timingPoint of bm.timingPoints) {
    // Calculate bpm only for uninherited points
    if (!timingPoint.uninherited) continue;

    const bpm = calculateBPM(timingPoint);

    if (!map.has(bpm)) {
      map.set(bpm, 0);
    }

    if (lastBPM !== -1 && lastPoint) {
      diff = timingPoint.time - lastPoint.time;
      map.set(lastBPM, map.get(lastBPM)! + diff);
    }

    lastBPM = bpm;
    lastPoint = timingPoint;
  }

  if (lastBPM !== -1 && lastPoint) {
    diff = lastNote.time - lastPoint.time;

    if (diff > 0) {
      map.set(lastBPM, map.get(lastBPM)! + diff);
    }
  }

  let min = Number.MAX_VALUE,
    max = Number.MIN_VALUE,
    mean = 0,
    maxLength = 0;

  for (let [key, value] of map) {
    if (key < min) min = key;
    if (key > max) max = key;
    if (value > maxLength) {
      maxLength = value;
      mean = key;
    }
  }

  if (min > max || mean < min || mean > max)
    console.error(`Something happened: ${min}-${max} (${mean})`);

  return { min, max, mean };
};

/**
 * calculate bpm for timing point. NOTE: works only with uninherited = 1
 * @param timingPoint
 * @returns
 */
const calculateBPM = (timingPoint: TimingPoint): number => {
  return (1 / timingPoint.beatLength) * 1000 * 60;
};
