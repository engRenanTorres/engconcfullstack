import { ReactElement } from 'react';
import defaultTWCss from '../styles/theme';

type Props = {
  title: string;
  subtitle?: string;
};

function Jumbotron({ title, subtitle }: Props): ReactElement<Props> {
  return (
    <div
      className={`rounded-lg text-neutral-100 m-5 mb-10 px-5 py-10 ${defaultTWCss.bgGradient}`}
    >
      <h1 className="text-3xl italic">{title}</h1>
      <p className="jumbotron-subtitle">{subtitle}</p>
    </div>
  );
}

export default Jumbotron;
