import Dashboard from '../containers/Dashboard';
import DefaultLayout from '../components/layout/DefaultLayout';

export const DashboardPage: React.FC = () => {
  return (
    <DefaultLayout sideContent="lateral" sideContent2="abaixo">
      <Dashboard />
    </DefaultLayout>
  );
};
