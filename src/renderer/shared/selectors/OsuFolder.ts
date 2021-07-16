import path from 'path';
import { createSelector } from 'reselect';

import { selectIsValid, selectOsuFolder } from '../../features/OsuFolder';

export const selectSongsFolder = createSelector(
  selectOsuFolder,
  selectIsValid,
  (folder, isValid) => (isValid ? path.join(folder, 'Songs') : '')
);

export { selectOsuFolder } from '../../features/OsuFolder';
