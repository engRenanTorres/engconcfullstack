import { useEffect, useState } from 'react';
import { deviceSizes } from '../../styles/device-sizes';

export const useMediaQuery = (screen: deviceSizes) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${screen})`;
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, screen]);

  return matches;
};
