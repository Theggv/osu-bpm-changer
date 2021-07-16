import { HitObject } from './HitObjects/HitObject';
import ColoursSection from './Sections/ColoursSection';
import DifficultySection, {
  DifficultySectionDefault,
} from './Sections/DifficultySection';
import EditorSection, { EditorSectionDefault } from './Sections/EditorSection';
import { BeatmapEvent } from './Sections/EventsSection';
import GeneralSection, {
  GeneralSectionDefault,
} from './Sections/GeneralSection';
import MetadataSection, {
  MetadataSectionDefault,
} from './Sections/MetadataSection';

/**
 * Osu Beatmap File Structure
 *
 * More info: https://osu.ppy.sh/wiki/en/osu%21_File_Formats/Osu_%28file_format%29
 */
export interface Beatmap {
  formatVersion: number;
  general: GeneralSection;
  editor: EditorSection;
  metadata: MetadataSection;
  difficulty: DifficultySection;
  events: BeatmapEvent[];
  timingPoints?: TimingPoint[];
  colours?: ColoursSection;
  hitObjects: HitObject[];
}

export class OsuBeatmapDefault implements Beatmap {
  formatVersion: number = 0;
  general: GeneralSection = new GeneralSectionDefault();
  editor: EditorSection = new EditorSectionDefault();
  metadata: MetadataSection = new MetadataSectionDefault();
  difficulty: DifficultySection = new DifficultySectionDefault();
  events: BeatmapEvent[] = [];
  timingPoints?: TimingPoint[];
  colours?: ColoursSection;
  hitObjects: HitObject[] = [];
}

/**
 * Timing point syntax: time,beatLength,meter,sampleSet,sampleIndex,volume,uninherited,effects
 */
export interface TimingPoint {
  /**
   * Start time of the timing section, in milliseconds from the beginning of the beatmap's audio. The end of the timing section is the next timing point's time (or never, if this is the last timing point).
   */
  time: number;
  /**
   * This property has two meanings:
   *
   * For uninherited timing points, the duration of a beat, in milliseconds.
   *
   * For inherited timing points, a negative inverse slider velocity multiplier, as a percentage. For example, -50 would make all sliders in this timing section twice as fast as SliderMultiplier.
   */
  beatLength: number;
  /**
   * Amount of beats in a measure. Inherited timing points ignore this property.
   */
  meter: number;
  /**
   * Default sample set for hit objects (0 = beatmap default, 1 = normal, 2 = soft, 3 = drum).
   */
  sampleSet: 0 | 1 | 2 | 3;
  /**
   * Custom sample index for hit objects. 0 indicates osu!'s default hitsounds.
   */
  sampleIndex: number;
  /**
   * Volume percentage for hit objects.
   */
  volume: number;
  /**
   * Whether or not the timing point is uninherited.
   */
  uninherited: boolean;
  /**
   * Bit flags that give the timing point extra effects.
   */
  effects: number;
}
