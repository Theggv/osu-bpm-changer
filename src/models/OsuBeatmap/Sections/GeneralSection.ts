export default interface GeneralSection {
  /**
   * Location of the audio file relative to the current folder
   */
  AudioFilename: string;
  /**
   * Milliseconds of silence before the audio starts playing
   * @default 0
   */
  AudioLeadIn: number;
  /**
   * Time in milliseconds when the audio preview should start
   * @default -1
   */
  PreviewTime: number;
  /**
   * Speed of the countdown before the first hit object
   * (0 = no countdown, 1 = normal, 2 = half, 3 = double)
   * @default 1
   */
  Countdown: 0 | 1 | 2 | 3;
  /**
   * Sample set that will be used if timing points do not override it (Normal, Soft, Drum)
   * @default 'Normal'
   */
  SampleSet: 'Normal' | 'Soft' | 'Drum';
  /**
   * Multiplier for the threshold in time where hit objects placed close together stack (0–1)
   * @default 0.7
   */
  StackLeniency: number;
  /**
   * Game mode (0 = osu!, 1 = osu!taiko, 2 = osu!catch, 3 = osu!mania)
   * @default 0
   */
  Mode: 0 | 1 | 2 | 3;
  /**
   * Whether or not breaks have a letterboxing effect
   * @default false
   */
  LetterboxInBreaks: boolean;
  /**
   * Whether or not the storyboard can use the user's skin images
   * @default false
   */
  UseSkinSprites: boolean;
  /**
   * Draw order of hit circle overlays compared to hit numbers
   * (NoChange = use skin setting,
   * Below = draw overlays under numbers,
   * Above = draw overlays on top of numbers)
   * @default 'NoChange'
   */
  OverlayPosition: 'NoChange' | 'Below' | 'Above';
  /**
   * Preferred skin to use during gameplay
   */
  SkinPreference?: string;
  /**
   * Whether or not a warning about flashing colours should be shown at the beginning of the map
   * @default false
   */
  EpilepsyWarning: boolean;
  /**
   * Time in beats that the countdown starts before the first hit object
   * @default 0
   */
  CountdownOffset: number;
  /**
   * Whether or not the "N+1" style key layout is used for osu!mania
   * @default false
   */
  SpecialStyle: boolean;
  /**
   * Whether or not the storyboard allows widescreen viewing
   * @default false
   */
  WidescreenStoryboard: boolean;
  /**
   * Whether or not sound samples will change rate when playing with speed-changing mods
   * @default false
   */
  SamplesMatchPlaybackRate: boolean;
}

export class GeneralSectionDefault implements GeneralSection {
  AudioFilename: string = '';
  AudioLeadIn: number = 0;
  PreviewTime: number = -1;
  Countdown: 0 | 1 | 2 | 3 = 1;
  SampleSet: 'Normal' | 'Soft' | 'Drum' = 'Normal';
  StackLeniency: number = 0.7;
  Mode: 0 | 1 | 2 | 3 = 0;
  LetterboxInBreaks: boolean = false;
  UseSkinSprites: boolean = false;
  OverlayPosition: 'NoChange' | 'Below' | 'Above' = 'NoChange';
  SkinPreference?: string;
  EpilepsyWarning: boolean = false;
  CountdownOffset: number = 0;
  SpecialStyle: boolean = false;
  WidescreenStoryboard: boolean = false;
  SamplesMatchPlaybackRate: boolean = false;
}
