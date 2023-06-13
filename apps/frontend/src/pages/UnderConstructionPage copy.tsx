import SimplePageLayout from '../components/layout/SimpleLayout';
import UnderConstruction from '../containers/UnderConstruction';

export const UnderConstructionPage: React.FC = () => {
  return (
    <SimplePageLayout title="Perdão! 404 =( ">
      <UnderConstruction />
    </SimplePageLayout>
  );
};
