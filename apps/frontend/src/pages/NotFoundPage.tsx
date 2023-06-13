import NotFound from '../containers/NotFound';
import SimplePageLayout from '../components/layout/SimpleLayout';

export const NotFoundPage: React.FC = () => {
  return (
    <SimplePageLayout title="Foi mal! 404 =( ">
      <NotFound />
    </SimplePageLayout>
  );
};
