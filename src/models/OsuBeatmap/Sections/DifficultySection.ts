export default interface DifficultySection {
  /**
   * HP setting (0–10)
   */
  HPDrainRate: number;
  /**
   * CS setting (0–10)
   */
  CircleSize: number;
  /**
   * OD setting (0–10)
   */
  OverallDifficulty: number;
  /**
   * AR setting (0–10)
   */
  ApproachRate: number;
  /**
   * Base slider velocity in hecto-osu! pixels per beat
   */
  SliderMultiplier: number;
  /**
   * Amount of slider ticks per beat
   */
  SliderTickRate: number;
}

export class DifficultySectionDefault implements DifficultySection {
  HPDrainRate: number = 5;
  CircleSize: number = 5;
  OverallDifficulty: number = 5;
  ApproachRate: number = 5;
  SliderMultiplier: number = 1.4;
  SliderTickRate: number = 1;
}
