import { FormikValues } from 'formik';
import { ReactElement, useCallback } from 'react';
import Login from '../containers/users/Login';
import SimplePageLayout from '../components/layout/SimpleLayout';
import useAuth from '../utils/hooks/useAuth';

// eslint-disable-next-line import/prefer-default-export
export function LoginPage(): ReactElement {
  const { signin } = useAuth();

  const handleLogin = useCallback(
    async (values: FormikValues) => {
      try {
        // console.log(values);
        signin(values.email, values.password);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    [signin]
  );
  return (
    <SimplePageLayout title="Bem vindo!">
      <Login handleLogin={handleLogin} />
    </SimplePageLayout>
  );
}
