/* eslint-disable react/require-default-props */
import { ReactElement, ReactNode } from 'react';
import defaultTWCss from '../../styles/theme';

type Props = {
  title?: string;
  children: ReactNode;
  logo?: boolean;
  widthPercent?: number;
};

function CardContent({
  title = '',
  children = '',
  logo = true,
  widthPercent = 96,
}: Props): ReactElement<Props> {
  return (
    <div
      role="main"
      className={`text-gray-900 h-screen flex items-center justify-center min-w-full ${defaultTWCss.textColor}`}
    >
      <section
        className={widthPercent === 96 ? 'w-96' : ` min-w-[${widthPercent}%]`}
      >
        <div className="bg-neutral-200 rounded-lg min-w-[80%] dark:bg-indigo-950">
          <div className=" min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              {!!logo && (
                <img
                  className="mx-auto h-20 w-auto"
                  src="/favicon.svg"
                  alt="Your Company"
                />
              )}
              <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight">
                {title}
              </h2>
            </div>
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CardContent;
