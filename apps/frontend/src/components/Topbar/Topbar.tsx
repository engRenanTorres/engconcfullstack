import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
import ThemeSwitcher from '../ThemeSwitcher';
import defaultTWCss from '../../styles/theme';
import { deviceSizes } from '../../styles/device-sizes';
import { useMediaQuery } from '../../utils/hooks/useMediaQuery';
import DropDown from './DropDown';
import useAuth from '../../utils/hooks/useAuth';

function Topbar(): ReactElement {
  const { currentUser } = useAuth();
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);
  const isNonMobile = useMediaQuery(deviceSizes.MOBILEL);
  const { icons } = defaultTWCss;

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleTheme = (theme: 'dark' | 'light' | null) => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <div className="mb-3 bg-neutral-200 dark:bg-indigo-950 p-3 flex justify-center md:justify-between ">
      {isNonMobile && (
        <div className="search-box bg-neutral-50 rounded-md flex">
          <input className="ml-2" placeholder="Search" />
          <button className="icon-button mr-2 p-1" type="button">
            <MagnifyingGlassIcon className="w-4" />
          </button>
        </div>
      )}

      {/* ICONS */}
      <nav className="flex px-2 sm:justify-around">
        <ThemeSwitcher
          theme={theme}
          toggleTheme={handleTheme}
          className="pr-2"
        />
        <button type="button" className="px-2">
          <BellIcon className={icons} />
        </button>
        <button
          type="button"
          className="dark:hover:text-purple-500 dark:text-neutral-200 px-2"
          onClick={
            () => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              1 + 0;
            } /* signout() */
          }
        >
          {currentUser && <span>{currentUser.name}</span>}
          {!currentUser && (
            <Link to="/signup">
              Cadastre-se {/* <AddIcon className="icon-button" /> */}
            </Link>
          )}
        </button>
        {!currentUser && (
          <Link className="dark:text-neutral-200" to="/login">
            Entre {/* <LoginIcon className="icon-button" /> */}
          </Link>
        )}
        {currentUser && <DropDown />}
      </nav>
    </div>
  );
}

export default Topbar;
