import fs from 'fs';

import { OsuBeatmap, OsuBeatmapDefault, TimingPoint } from '.';
import { Colour } from './Sections/ColoursSection';
import {
  EventBackground,
  EventBreak,
  EventVideo,
} from './Sections/EventsSection';
import {
  HitObject,
  HitObjectImpl,
  HitObjectType,
} from './HitObjects/HitObject';
import { HitObjectHold, HitObjectHoldImpl } from './HitObjects/HitObjectHold';
import {
  HitObjectSlider,
  HitObjectSliderImpl,
} from './HitObjects/HitObjectSlider';
import {
  HitObjectSpinner,
  HitObjectSpinnerImpl,
} from './HitObjects/HitObjectSpinner';

export class OsuBeatmapReader {
  public parse(path: string): Promise<OsuBeatmap> {
    return new Promise((resolve, reject) => {
      const beatmap = new OsuBeatmapDefault();

      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        const lines = data.split('\n').map((line) => line.trim());

        beatmap.formatVersion = this.parseVersion(lines[0]);

        let sectionName = '';

        for (let line of lines) {
          line = line.trim();

          // Skip comments
          if (line.indexOf('//') >= 0) continue;

          // Trying to find section
          if (!sectionName) {
            switch (line) {
              case '[General]':
              case '[Editor]':
              case '[Metadata]':
              case '[Difficulty]':
              case '[Events]':
              case '[TimingPoints]':
              case '[Colours]':
              case '[HitObjects]':
                sectionName = line;
                continue;
            }
          }

          // Reset section if empty string was found
          if (line === '') {
            sectionName = '';
            continue;
          }

          switch (sectionName) {
            case '[General]':
              this.parseGeneral(line, beatmap);
              break;
            case '[Editor]':
              this.parseEditor(line, beatmap);
              break;
            case '[Metadata]':
              this.parseMetadata(line, beatmap);
              break;
            case '[Difficulty]':
              this.parseDifficulty(line, beatmap);
              break;
            case '[Events]':
              this.parseEvents(line, beatmap);
              break;
            case '[TimingPoints]':
              this.parseTimingPoints(line, beatmap);
              break;
            case '[Colours]':
              this.parseColours(line, beatmap);
              break;
            case '[HitObjects]':
              this.parseHitObjects(line, beatmap);
              break;
          }
        }

        resolve(beatmap);
      });
    });
  }

  private parseVersion(str: string): number {
    const pattern = 'osu file format v';
    let index = str.indexOf(pattern);

    if (index < 0) throw new Error("Can't parse file format");

    return Number(str.substring(pattern.length));
  }

  private parseGeneral(str: string, beatmap: OsuBeatmap) {
    const [key, value] = str.split(':').map((x) => x.trim());
    const type = typeof (beatmap.general as any)[key];

    switch (type) {
      case 'number':
        (beatmap.general as any)[key] = Number(value);
        break;
      case 'boolean':
        (beatmap.general as any)[key] = Boolean(value);
        break;
      case 'string':
        (beatmap.general as any)[key] = value;
        break;
    }
  }

  private parseEditor(str: string, beatmap: OsuBeatmap) {
    const [key, value] = str.split(':').map((x) => x.trim());
    switch (key) {
      case 'Bookmarks':
        beatmap.editor.Bookmarks = value.split(',').map(Number);
        break;
      case 'DistanceSpacing':
      case 'BeatDivisor':
      case 'GridSize':
      case 'TimelineZoom':
        (beatmap.editor as any)[key] = Number(value);
        break;
    }
  }

  private parseMetadata(str: string, beatmap: OsuBeatmap) {
    const [key, value] = str.split(':').map((x) => x.trim());

    switch (key) {
      case 'Title':
      case 'TitleUnicode':
      case 'Artist':
      case 'ArtistUnicode':
      case 'Creator':
      case 'Version':
      case 'Source':
        (beatmap.metadata as any)[key] = value;
        break;
      case 'Tags':
        (beatmap.metadata as any)[key] = value.split(' ');
        break;
      case 'BeatmapID':
      case 'BeatmapSetID':
        (beatmap.metadata as any)[key] = Number(value);
        break;
    }
  }

  private parseDifficulty(str: string, beatmap: OsuBeatmap) {
    const [key, value] = str.split(':').map((x) => x.trim());
    (beatmap.difficulty as any)[key] = Number(value);
  }

  private parseEvents(str: string, beatmap: OsuBeatmap) {
    const args = str.split(',');

    if (args[0] === '0') {
      beatmap.events.push(
        new EventBackground(args[2], Number(args[3]), Number(args[4]))
      );
    } else if (args[0] === '1' || args[0] === 'Video') {
      beatmap.events.push(
        new EventVideo(
          Number(args[1]),
          args[2],
          Number(args[3]),
          Number(args[4])
        )
      );
    } else if (args[0] === '2' || args[0] === 'Break') {
      beatmap.events.push(new EventBreak(Number(args[1]), Number(args[2])));
    }
  }

  private parseTimingPoints(str: string, beatmap: OsuBeatmap) {
    if (!beatmap.timingPoints) beatmap.timingPoints = [];

    const [
      time,
      beatLength,
      meter,
      sampleSet,
      sampleIndex,
      volume,
      uninherited,
      effects,
    ] = str.split(',').map(Number);

    const timingPoint: TimingPoint = {
      time,
      beatLength,
      meter,
      sampleSet: sampleSet as 0 | 1 | 2 | 3,
      sampleIndex,
      volume,
      uninherited: Boolean(uninherited),
      effects,
    };

    beatmap.timingPoints.push(timingPoint);
  }

  private parseColours(str: string, beatmap: OsuBeatmap) {
    if (!beatmap.colours) {
      beatmap.colours = { colours: [] };
    }

    const [key, value] = str.split(':').map((x) => x.trim());
    const [r, g, b] = value.split(',').map(Number);

    switch (key) {
      case 'SliderBorder':
      case 'SliderTrackOverride':
        (beatmap.colours as any)[key] = { r, g, b } as Colour;
        break;
      default:
        beatmap.colours.colours.push({ r, g, b } as Colour);
        break;
    }
  }

  private parseHitObjects(str: string, beatmap: OsuBeatmap) {
    const data = str.split(',');

    // Hit object syntax: x,y,time,type,hitSound,objectParams,hitSample
    const baseObject: HitObject = new HitObjectImpl({
      x: Number(data[0]),
      y: Number(data[1]),
      time: Number(data[2]),
      type: Number(data[3]),
      hitSound: Number(data[4]),
    });

    if (baseObject.type & HitObjectType.Circle) {
      baseObject.hitSample = data[5];

      beatmap.hitObjects.push(baseObject);
    } else if (baseObject.type & HitObjectType.Slider) {
      const [curveType, ...curvePointsStr] = data[5].split('|');

      // Slider syntax: x,y,time,type,hitSound,curveType|curvePoints,slides,length,edgeSounds,edgeSets,hitSample
      const slider: HitObjectSlider = new HitObjectSliderImpl({
        ...baseObject,
        curveType: curveType as 'B' | 'C' | 'L' | 'P',
        curvePoints: curvePointsStr.map((set) =>
          Object.fromEntries(this.zip(['x', 'y'], set.split(':').map(Number)))
        ),
        slides: Number(data[6]),
        length: Number(data[7]),
        edgeSounds: data[8] ? data[8].split('|').map(Number) : null,
        edgeSets: data[9]
          ? data[9]
              .split('|')
              .map((set) =>
                Object.fromEntries(
                  this.zip(
                    ['normalSet', 'additionSet'],
                    set.split(':').map(Number)
                  )
                )
              )
          : null,
        hitSample: data[10],
      });

      beatmap.hitObjects.push(slider);
    } else if (baseObject.type & HitObjectType.Spinner) {
      // Spinner syntax: x,y,time,type,hitSound,endTime,hitSample
      const spinner: HitObjectSpinner = new HitObjectSpinnerImpl({
        ...baseObject,
        endTime: Number(data[5]),
        hitSample: data[6],
      });

      beatmap.hitObjects.push(spinner);
    } else if (baseObject.type & HitObjectType.Hold) {
      // Hold syntax: x,y,time,type,hitSound,endTime:hitSample
      const [endTime, hitSample] = data[5].split(':');

      const hold: HitObjectHold = new HitObjectHoldImpl({
        ...baseObject,
        endTime: Number(endTime),
        hitSample,
      });

      beatmap.hitObjects.push(hold);
    }
  }
  private zip(a: any[], b: any[]): any[][] {
    return a.map((key, index) => [key, b[index]]);
  }
}
