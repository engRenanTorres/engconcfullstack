import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegexHelper } from '../../helpers/regex.helper';
import { MessagesHelper } from '../../helpers/message.helper';

interface FormikValues {
  name: string;
  email: string;
  cnpj: string;
  password: string;
}
interface SignupProps {
  handleSignup: (values: FormikValues) => void;
}

export const Signup: React.FC<SignupProps> = ({
  handleSignup,
}: SignupProps) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email inválido')
      .required('O Email é obrigatório'),
    cnpj: Yup.string()
      .matches(RegexHelper.cnpj, MessagesHelper.CNPJ_VALID)
      .required('O CPF/CNPJ é obrigatório'),
    password: Yup.string()
      .matches(RegexHelper.password, MessagesHelper.PASSWORD_VALID)
      .required('O password é obrigatório'),
  });
  const initialValues = {
    name: '',
    email: '',
    cnpj: '',
    password: '',
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm max-h-full overflow-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignup}
        validationSchema={validationSchema}
      >
        <Form className="space-y-6">
          <div className="flex">
            <div className="mr-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6"
              >
                Nome
              </label>
              <div className="mt-2">
                <Field
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Nome aqui..."
                  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-sm text-red-700"
                />
              </div>
            </div>
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
          </div>
          <div>
            <label
              htmlFor="cnpj"
              className="block text-sm font-medium leading-6"
            >
              CPF ou CNPJ
            </label>
            <div className="mt-2">
              <Field
                id="cnpj"
                name="cnpj"
                type="text"
                required
                placeholder="CNPJ aqui..."
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage
                name="cnpj"
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Cadastrar
            </button>
          </div>
        </Form>
      </Formik>

      <p className="mt-10 text-center text-sm">
        Já é membro?{' '}
        <a
          href="/Login"
          className="font-semibold leading-6 text-indigo-600 dark:text-purple-300 hover:text-indigo-500"
        >
          Entre por aqui
        </a>
      </p>
    </div>
  );
};
