/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ReactElement } from 'react';
import TButton from '../../components/ui/TButton';

interface FormikValues {
  email: string;
  password: string;
}

interface LoginProps {
  handleLogin: (values: FormikValues) => void;
}

function Login({ handleLogin }: LoginProps): ReactElement<LoginProps> {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Email inválido')
      .required('O Email é obrigatório'),
    password: Yup.string().required('O password é obrigatório'),
  });
  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Email
            </label>
            <div className="mt-2">
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Email aqui..."
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-700"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="/under-construction"
                  className="font-semibold text-indigo-600 dark:text-purple-300 hover:text-indigo-500"
                >
                  Esqueceu seu password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password..."
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-700"
              />
            </div>
          </div>

          <div>
            {/* <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Logar
            </button> */}
            <TButton submitType bg="indigo-600 ">
              Logar
            </TButton>
          </div>
        </Form>
      </Formik>

      <p className="mt-10 text-center text-sm">
        Não é membro?{' '}
        <a
          href="/signup"
          className="font-semibold leading-6 text-indigo-600 dark:text-purple-300 hover:text-indigo-500"
        >
          Cadastre-se aqui
        </a>
      </p>
    </div>
  );
}

export default Login;
