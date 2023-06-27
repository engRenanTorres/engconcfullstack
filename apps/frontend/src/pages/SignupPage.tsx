/* eslint-disable no-alert */
import { FormikValues } from 'formik';
import { ReactElement, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SimplePageLayout from '../components/layout/SimpleLayout';
import { Signup } from '../containers/users/Signup';
import axiosClient from '../utils/httpClient/axiosClient';

interface SignUpError extends Error {
  response: {
    data: {
      error: string;
      message: string;
      statusCode: number;
    };
  };
}

// eslint-disable-next-line import/prefer-default-export
export function SignupPage(): ReactElement {
  const navigate = useNavigate();

  const handleSignup = useCallback(
    async (values: FormikValues) => {
      /* try { */
      const body = {
        name: values.name,
        email: values.email,
        cnpj: values.cnpj,
        password: values.password,
      };
      // console.log(body);
      await axiosClient
        .post('/users', body)
        .then(() => {
          navigate('/login');
          // router.push('/');
        })
        // eslint-disable-next-line consistent-return
        .catch((error) => {
          if ((error as SignUpError)?.response?.data?.statusCode === 409) {
            return alert('Este e-mail de usuário já possui um cadastro.');
          }
          if ((error as SignUpError).response?.data?.message) {
            return alert((error as SignUpError).response?.data?.message);
          }
          alert(error.message);
        });
    },
    [navigate]
  );

  return (
    <SimplePageLayout title="Novo por aqui?">
      <Signup handleSignup={handleSignup} />
    </SimplePageLayout>
  );
}
