import { ReactElement, ReactNode } from 'react';
import Topbar from '../Topbar/Topbar';
import Jumbotron from '../Jumbotron';
import Sidebar from '../Sidebar/Sidebar';
import defaultTWCss from '../../styles/theme';
import { deviceSizes } from '../../styles/device-sizes';
import { useMediaQuery } from '../../utils/hooks/useMediaQuery';

type Props = {
  children: ReactNode;
  jumbotronTitle?: string;
  jumbotronSubtitle?: string;
};

function QuestionLayout({
  children,
  jumbotronTitle,
  jumbotronSubtitle,
}: Props): ReactElement<Props> {
  const { bgColordefault, textColor } = defaultTWCss;
  const isNonMobile = useMediaQuery(deviceSizes.MOBILEL);
  return (
    <div className={`flex h-full min-h-screen${bgColordefault}`}>
      {isNonMobile && <Sidebar />}
      <div id="top" className="flex-1">
        <Topbar />
        <div className="pt-6 mx-5">
          {!!jumbotronTitle && (
            <Jumbotron title={jumbotronTitle} subtitle={jumbotronSubtitle} />
          )}
          <main className="h-fit min-h-full dark:text-neutral-200  m-5">
            <div className="h-fit">{children}</div>
          </main>
        </div>
        <footer className={`flex justify-center my-4${textColor}`}>
          <a href="#top">Voltar ao topo</a>
        </footer>
      </div>
    </div>
  );
}

export default QuestionLayout;
