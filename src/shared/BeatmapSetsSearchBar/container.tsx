import React from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../components/SearchBar';
import { setFilter } from './ducks';

const BeatmapSetsSearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const onChange = (searchString: string) => {
    dispatch(setFilter(searchString));
  };

  return <SearchBar placeholder={'Beatmap'} onQueryChanged={onChange} />;
};

export default BeatmapSetsSearchBar;
