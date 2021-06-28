export default interface MetadataSection {
  /**
   * Romanised song title
   */
  Title: string;
  /**
   * Song title
   */
  TitleUnicode: string;
  /**
   * Romanised song artist
   */
  Artist: string;
  /**
   * Song artist
   */
  ArtistUnicode: string;
  /**
   * Beatmap creator
   */
  Creator: string;
  /**
   * Difficulty name
   */
  Version: string;
  /**
   * Original media the song was produced for
   */
  Source: string;
  /**
   * Search terms
   */
  Tags: string[];
  /**
   * Difficulty ID
   */
  BeatmapID: number;
  /**
   * Beatmap ID
   */
  BeatmapSetID: number;
}

export class MetadataSectionDefault implements MetadataSection {
  Title: string = '';

  TitleUnicode: string = '';

  Artist: string = '';

  ArtistUnicode: string = '';

  Creator: string = '';

  Version: string = '';

  Source: string = '';

  Tags: string[] = [];

  BeatmapID: number = 0;

  BeatmapSetID: number = 0;
}
