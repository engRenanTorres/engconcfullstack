/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';

interface FormikValues {
  question: string;
  alternatives: number;
  alternative1: string;
  alternative2: string;
  alternative3: string;
  alternative4: string;
  alternative5: string;
  concurso: string;
  area: string;
  subject: string;
  level: string;
}

interface CreateProps {
  handleSubmit: (values: FormikValues) => void;
}

export default function QuestionsList({ handleSubmit }: CreateProps) {
  const [alternatives, setAlternatives] = useState<number>(2);

  const initialValues = {
    question: '',
    alternatives: 2,
    alternative1: '',
    alternative2: '',
    alternative3: '',
    alternative4: '',
    alternative5: '',
    concurso: '',
    area: '',
    subject: '',
    level: '',
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('A questão é obrigatória'),
    alternative1: Yup.string().required('A alternativa A é obrigatória'),
    alternative2: Yup.string().required('A alternativa B é obrigatória'),
  });

  const handleChoices = (event: ChangeEvent<HTMLSelectElement>) => {
    setAlternatives(+event.target.value);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
            <h2 className="text-base font-semibold leading-7">Nova questão</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Favor verifique se a questão já consta no nosso bd antes de
              inseri-la.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="question"
                  className="block text-sm font-medium leading-6"
                >
                  Questão
                </label>
                <div className="mt-2">
                  <Field
                    as="textarea"
                    id="question"
                    name="question"
                    rows={3}
                    className="block w-full text-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue=""
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className="text-sm text-red-700"
                  />
                </div>
                <p className="mt-3 text-sm leading-6">
                  Insira aqui a pergunta da questão.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
            <h3 className="text-base font-semibold leading-7">Alternativas</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Selecione o tipo de questão.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6"
                >
                  Quantas alternativas?
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    onChange={handleChoices}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value={2}>Verdadeiro ou Falso</option>
                    <option value={3}>3 - a - b - c</option>
                    <option value={4}>4 - a até d</option>
                    <option value={5}>5 - a até e</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
              <div
                className={`mt-10 ${
                  alternatives === 2 &&
                  'grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'
                }`}
              >
                <div className="sm:col-span-3">
                  <label
                    htmlFor="alternative1"
                    className="block text-sm font-medium leading-6"
                  >
                    {alternatives === 2 ? 'Verdadeiro' : 'Alternativa A'}
                  </label>
                  <div className="mt-2">
                    <Field
                      type="text"
                      as={alternatives === 2 ? 'input' : 'textarea'}
                      name="alternative1"
                      id="alternative1"
                      placeholder="Correta"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="alternative1"
                      component="div"
                      className="text-sm text-red-700"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="alternative2"
                    className="block text-sm font-medium leading-6"
                  >
                    {alternatives === 2 ? 'Falso' : 'Alternativa B'}
                  </label>
                  <div className="mt-2">
                    <Field
                      type="text"
                      as={alternatives === 2 ? 'input' : 'textarea'}
                      name="alternative2"
                      id="alternative2"
                      placeholder="Errada"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage
                      name="alternative2"
                      component="div"
                      className="text-sm text-red-700"
                    />
                  </div>
                </div>
              </div>
              {alternatives > 2 && (
                <div className="col-span-full">
                  <label
                    htmlFor="alternative1"
                    className="block text-sm font-medium leading-6"
                  >
                    Alternativa C
                  </label>
                  <div className="mt-2">
                    <Field
                      as="textarea"
                      id="alternative3"
                      name="alternative3"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset text-black ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue=""
                    />
                    <ErrorMessage
                      name="alternative3"
                      component="div"
                      className="text-sm text-red-700"
                    />
                  </div>
                </div>
              )}
              {alternatives > 3 && (
                <div className="col-span-full">
                  <label
                    htmlFor="alternative1"
                    className="block text-sm font-medium leading-6"
                  >
                    Alternativa D
                  </label>
                  <div className="mt-2">
                    <Field
                      as="textarea"
                      id="alternative4"
                      name="alternative4"
                      rows={3}
                      className="block w-full text-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue=""
                    />
                    <ErrorMessage
                      name="alternative4"
                      component="div"
                      className="text-sm text-red-700"
                    />
                  </div>
                </div>
              )}
              {alternatives > 4 && (
                <div className="col-span-full">
                  <label
                    htmlFor="alternative5"
                    className="block text-sm font-medium leading-6"
                  >
                    Alternativa E
                  </label>
                  <div className="mt-2">
                    <Field
                      as="textarea"
                      id="alternative5"
                      name="alternative5"
                      rows={3}
                      className="block w-full text-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue=""
                    />
                    <ErrorMessage
                      name="alternative5"
                      component="div"
                      className="text-sm text-red-700"
                    />
                  </div>
                </div>
              )}
            </div>
            <h3 className="text-base font-semibold leading-7">
              Informações técnicas
            </h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Selecione as informações técnicos.
            </p>
            <div className="flex flex-wrap justify-stretch">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="concurso"
                    className="block text-sm font-medium leading-6"
                  >
                    Concurso
                  </label>
                  <div className="mt-2">
                    <Field
                      as="select"
                      id="concurso"
                      name="concurso"
                      className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={2}>Petrobrás 2010</option>
                      <option value={3}>Fundação Saúde</option>
                    </Field>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium leading-6"
                  >
                    Área
                  </label>
                  <div className="mt-2">
                    <Field
                      as="select"
                      id="area"
                      name="area"
                      className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={1}>Segurança do Trabalho</option>
                      <option value={2}>Engenharia Civil</option>
                    </Field>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium leading-6"
                  >
                    Matéria
                  </label>
                  <div className="mt-2">
                    <Field
                      as="select"
                      id="subject"
                      name="subject"
                      className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={1}>NR 12</option>
                      <option value={2}>NR 15 - Insalubridade</option>
                    </Field>
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium leading-6"
                  >
                    Nível
                  </label>
                  <div className="mt-2">
                    <Field
                      as="select"
                      id="level"
                      name="level"
                      className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={1}>Superior</option>
                      <option value={2}>Técnico</option>
                      <option value={2}>Médio</option>
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-900/10 dark:border-gray-100/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6">
                Resposta correta
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                Qual a resposta correta da questão?
              </p>
              <div className="flex justify-around items-center mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <Field
                    id="answer1"
                    value="A"
                    name="answer"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6"
                  >
                    A)
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <Field
                    id="answer2"
                    value="B"
                    name="answer"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6"
                  >
                    B)
                  </label>
                </div>
                {alternatives > 2 && (
                  <div className="flex items-center gap-x-3">
                    <Field
                      id="answer3"
                      value="C"
                      name="answer"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6"
                    >
                      C)
                    </label>
                  </div>
                )}
                {alternatives > 3 && (
                  <div className="flex items-center gap-x-3">
                    <Field
                      id="answer4"
                      name="answer"
                      value="D"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6"
                    >
                      D)
                    </label>
                  </div>
                )}
                {alternatives > 4 && (
                  <div className="flex items-center gap-x-3">
                    <Field
                      id="answer5"
                      name="answer"
                      value="E"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6"
                    >
                      E)
                    </label>
                  </div>
                )}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="tip"
                  className="block text-sm font-medium leading-6"
                >
                  Observações
                </label>
                <div className="mt-2">
                  <Field
                    id="tip"
                    as="textarea"
                    name="tip"
                    rows={3}
                    className="block w-full text-black rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue=""
                  />
                  <ErrorMessage
                    name="tip"
                    component="div"
                    className="text-sm text-red-700"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6">
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Salvar
          </button>
        </div>
      </Form>
    </Formik>
  );
}
