import { analyzeBPM, BPMAnalytics, multiplyBPM } from '../ConvertManager/SpeedChanger';
import { OsuBeatmapReader } from './BeatmapReader';
import { OsuBeatmapWriter } from './BeatmapWriter';

export function testConvert() {
  const inputPath =
    './example/Spawn Of Possession - Apparition (Mazzerin) [Blind Faith].osu';
  const outputPath =
    './example/Spawn Of Possession - Apparition (Mazzerin) [Blind Faith 1.10x].osu';

  const reader = new OsuBeatmapReader();
  const writer = new OsuBeatmapWriter();

  console.log('Start parsing...');

  reader
    .parse(inputPath)
    .then((beatmap) => {
      console.log('Beatmap parsed. ');

      debugInfo(analyzeBPM(beatmap));

      multiplyBPM(beatmap, 1.1);

      debugInfo(analyzeBPM(beatmap));

      console.log('Start writting...');

      writer.write(outputPath, beatmap).then(() => {
        console.log('Done.');
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function debugInfo(data: BPMAnalytics) {
  console.log(
    `OK: ${data.min.toFixed(1)}-${data.max.toFixed(1)} (${data.mean.toFixed(
      1
    )})`
  );
}
