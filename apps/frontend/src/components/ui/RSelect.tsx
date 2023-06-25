/* eslint-disable jsx-a11y/label-has-associated-control */
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  color?: string;
  to?: string;
  circle?: boolean;
  bg?: string;
  link?: boolean;
  href?: string;
}

function RSelect({
  color = 'black',
  bg = 'neutral',
  to = '',
  circle = false,
  href = '',
  link = false,
}: Props): ReactElement<Props> {
  const classes = [
    'flex',
    'whitespace-nowrap',
    'text-sm',
    'border',
    'border2',
    'border-transparent',
  ];
  if (link) {
    classes.push('transition-colors');
    switch (color) {
      case 'indigo':
        classes.push('text-indigo-500', 'focus:border-indigo-500');
        break;
      case 'emerald':
        classes.push('text-emerald-500', 'focus:border-emerald-500');
        break;
      case 'neutral':
        classes.push('text-neutral-200', 'hover:border-neutral-200');
        break;
      case 'white':
        classes.push('text-white', 'hover:border-white');
        break;
      case 'black':
        classes.push('text-black', 'hover:border-black');
        break;
      default:
        classes.push('text-black', 'hover:border-black');
        break;
    }
  } else {
    classes.push('text-neutral-200', 'focus:ring-2', 'focus:ring-offset2');
    switch (color) {
      case 'indigo':
        classes.push('text-indigo-500', 'focus:border-indigo-500');
        break;
      case 'emerald':
        classes.push('text-emerald-500', 'focus:border-emerald-500');
        break;
      case 'neutral':
        classes.push('text-neutral-500', 'focus:border-neutral-500');
        break;
      case 'white':
        classes.push('text-white', 'hover:border-white');
        break;
      case 'black':
        classes.push('text-black', 'hover:border-black');
        break;
      default:
        classes.push('text-black', 'hover:border-black');
        break;
    }
  }
  if (circle) {
    classes.push(
      'h8',
      'w-8',
      'items-center',
      'justify-center',
      'rounded-full',
      'text-sm'
    );
  }
  return (
    <div>
      <div className="sm:col-span-3">
        <label
          htmlFor="country"
          className={`block text-sm font-medium leading-6 bg-${bg}-200 hover:bg-${bg}-400 dark:bg-${bg}-800 dark:hover:bg-${bg}-600 text-gray-900`}
        >
          Country
        </label>
        <div className="mt-2">
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option>United States3</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default RSelect;
