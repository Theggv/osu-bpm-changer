export interface Colour {
  r: number;
  g: number;
  b: number;
}

export default interface ColoursSection {
  colours: Colour[];
  SliderTrackOverride?: Colour;
  SliderBorder?: Colour;
}
