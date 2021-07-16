import { useEffect, useState } from 'react';
import { List } from 'react-virtualized';

export const useSmoothScrolling = (ref: React.RefObject<List>) => {
  const data = {
    ease: 0.1,
    current: 0,
    previous: 0,
    rounded: 0,
  };

  const [transform, setTransform] = useState('none');

  useEffect(() => {
    requestAnimationFrame(() => smoothScrollingHandler());
  }, []);

  const smoothScrollingHandler = () => {
    data.current = window.scrollY;
    data.previous += (data.current - data.previous) * data.ease;
    data.rounded = Math.round(data.previous * 100) / 100;

    if (ref.current) setTransform(`translateY(-${data.previous}px)`);

    requestAnimationFrame(() => smoothScrollingHandler());
  };

  return {
    transform,
  };
};
