import { Link } from 'react-router-dom';

interface Props {
  color?: string;
  to?: string;
  circle?: boolean;
  bg?: string;
  link?: boolean;
  href?: string;
  target?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  submitType?: boolean;
}

const TButton: React.FC<Props> = ({
  color = 'black',
  bg = 'neutral',
  to = '',
  circle = false,
  href = '',
  link = false,
  target = '_blank',
  children = '',
  onClick = () => console.log('set button action'),
  submitType = false,
}: Props) => {
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
      {!!href && (
        <a href={href} className={classes.join(' ')} target={target}>
          {children}
        </a>
      )}
      {!!to && (
        <Link to={to} className={classes.join(' ')}>
          {children}
        </Link>
      )}
      {!to && !href && (
        <button
          className={`flex py-2 justify-center items-center min-w-full rounded-lg bg-${bg}-200 hover:bg-${bg}-400 dark:bg-${bg}-800 dark:hover:bg-${bg}-600 ${classes.join(
            ' '
          )}`}
          type={submitType ? 'submit' : 'button'}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default TButton;
