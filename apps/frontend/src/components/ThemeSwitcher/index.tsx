import { MoonIcon, SunIcon } from '@heroicons/react/20/solid';
import { ReactElement, useEffect } from 'react';

type Props = {
  className?: string;
  theme: 'dark' | 'light' | null;
  toggleTheme: (theme: 'dark' | 'light' | null) => void;
};

export default function ThemeSwitcher({
  className = 'p-2',
  theme,
  toggleTheme,
}: Props): ReactElement<Props> {
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <button
      type="button"
      className={className}
      onClick={() => toggleTheme(theme)}
    >
      {theme === 'dark' ? (
        <MoonIcon className="w-4 fill-neutral-200" />
      ) : (
        <SunIcon className="w-4" />
      )}
    </button>
  );
}
