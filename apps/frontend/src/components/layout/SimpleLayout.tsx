import { ReactElement, ReactNode } from 'react';
import Topbar from '../Topbar/Topbar';
import CardContent from './CardContent';
import defaultTWCss from '../../styles/theme';

interface Props {
  title?: string;
  children: ReactNode;
}

function SimplePageLayout({ title, children }: Props): ReactElement<Props> {
  return (
    <div className={`h-fit max-h-full overflow-auto${defaultTWCss.bgGradient}`}>
      <Topbar />
      <CardContent title={title}>{children}</CardContent>
    </div>
  );
}

export default SimplePageLayout;
