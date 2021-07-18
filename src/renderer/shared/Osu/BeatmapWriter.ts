import fs from 'fs';

import { Beatmap } from './Beatmap';
import { Colour } from './Beatmap/Sections/ColoursSection';
import {
  EventBackground,
  EventBreak,
  EventVideo,
} from './Beatmap/Sections/EventsSection';

export class OsuBeatmapWriter {
  public write(path: string, beatmap: Beatmap): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      let data =
        this.writeVersion(beatmap) +
        this.writeGeneral(beatmap) +
        this.writeEditor(beatmap) +
        this.writeMetadata(beatmap) +
        this.writeDifficulty(beatmap) +
        this.writeEvents(beatmap) +
        this.writeTimingPoints(beatmap) +
        this.writeColours(beatmap) +
        this.writeHitObjects(beatmap);

      fs.writeFile(path, data, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  private writeVersion(beatmap: Beatmap): string {
    return 'osu file format v' + beatmap.formatVersion + '\n\n';
  }

  private writeGeneral(beatmap: Beatmap): string {
    let data = '[General]\n';

    for (let [key, value] of Object.entries(beatmap.general)) {
      data += key + ': ' + this.convertValue(value) + '\n';
    }

    return data + '\n';
  }

  private writeEditor(beatmap: Beatmap): string {
    let data = '[Editor]\n';

    for (let [key, value] of Object.entries(beatmap.editor)) {
      if (key === 'Bookmarks') {
        data += key + ': ' + (value as []).map(Math.round).join(',') + '\n';
      } else {
        data += key + ': ' + this.convertValue(value) + '\n';
      }
    }

    return data + '\n';
  }

  private writeMetadata(beatmap: Beatmap): string {
    let data = '[Metadata]\n';

    for (let [key, value] of Object.entries(beatmap.metadata)) {
      if (key === 'Tags') {
        data += key + ': ' + (value as []).join(' ') + '\n';
      } else {
        data += key + ': ' + this.convertValue(value) + '\n';
      }
    }

    return data + '\n';
  }

  private writeDifficulty(beatmap: Beatmap): string {
    let data = '[Difficulty]\n';

    for (let [key, value] of Object.entries(beatmap.difficulty)) {
      data += key + ': ' + this.convertValue(value) + '\n';
    }

    return data + '\n';
  }

  private writeEvents(beatmap: Beatmap): string {
    let data = '[Events]\n';

    data += '//Background and Video events\n';

    beatmap.events.forEach((value) => {
      if (value instanceof EventBackground || value instanceof EventVideo) {
        data += `${value.serialize()}\n`;
      }
    });

    data += '//Break Periods\n';

    beatmap.events.forEach((value) => {
      if (value instanceof EventBreak) {
        data += `${value.serialize()}\n`;
      }
    });

    data += '//Storyboard Layer 0 (Background)\n';
    data += '//Storyboard Layer 1 (Fail)\n';
    data += '//Storyboard Layer 2 (Pass)\n';
    data += '//Storyboard Layer 3 (Foreground)\n';
    data += '//Storyboard Layer 4 (Overlay)\n';
    data += '//Storyboard Sound Samples\n';

    return data + '\n';
  }

  private writeTimingPoints(beatmap: Beatmap): string {
    if (!beatmap.timingPoints) return '';

    let data = '[TimingPoints]\n';

    for (let timingPoint of beatmap.timingPoints) {
      // time,beatLength,meter,sampleSet,sampleIndex,volume,uninherited,effects
      data +=
        Math.round(timingPoint.time) +
        ',' +
        timingPoint.beatLength +
        ',' +
        timingPoint.meter +
        ',' +
        timingPoint.sampleSet +
        ',' +
        timingPoint.sampleIndex +
        ',' +
        timingPoint.volume +
        ',' +
        this.convertValue(timingPoint.uninherited) +
        ',' +
        timingPoint.effects +
        '\n';
    }

    return data + '\n';
  }

  private writeColours(beatmap: Beatmap): string {
    if (!beatmap.colours) return '';

    let data = '[Colours]\n';

    let index = 1;

    for (let colour of beatmap.colours.colours) {
      data += `Combo${index++}: ${this.convertColour(colour)}\n`;
    }

    if (beatmap.colours.SliderBorder)
      data +=
        'SliderBorder: ' +
        this.convertColour(beatmap.colours.SliderBorder) +
        '\n';

    if (beatmap.colours.SliderTrackOverride)
      data +=
        'SliderBorder: ' +
        this.convertColour(beatmap.colours.SliderTrackOverride) +
        '\n';

    return data + '\n';
  }

  private writeHitObjects(beatmap: Beatmap): string {
    let data = '[HitObjects]\n';

    for (let hitObject of beatmap.hitObjects) {
      data += `${hitObject.serialize()}\n`;
    }

    return data + '\n';
  }

  private convertValue(value: any): any {
    if (value === undefined || value === null || value === 'NaN') return '';

    const type = typeof value;

    if (type === 'boolean') return Number(value);

    return value;
  }

  private convertColour(value: Colour): string {
    return value.r + ',' + value.g + ',' + value.b;
  }
}
