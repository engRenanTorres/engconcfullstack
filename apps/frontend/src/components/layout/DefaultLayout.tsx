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
  sideContent?: ReactNode;
  sideContent2?: ReactNode;
};

function DefaultLayout({
  children,
  jumbotronTitle,
  jumbotronSubtitle,
  sideContent,
  sideContent2,
}: Props): ReactElement<Props> {
  const { bgColordefault, bottomLine, textColor } = defaultTWCss;
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
          <main className="h-fit min-h-full dark:text-neutral-200 grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-5 m-5">
            <div className="h-fit">{children}</div>
            <aside className="flex-1">
              {!!sideContent && (
                <div className={`h-fit${bottomLine}`}>{sideContent}</div>
              )}
              {!!sideContent2 && <div className="h-fit">{sideContent2}</div>}
            </aside>
          </main>
        </div>
        <footer className={`flex justify-center my-4${textColor}`}>
          <a href="#top">Voltar ao topo</a>
        </footer>
      </div>
    </div>
  );
}

export default DefaultLayout;
