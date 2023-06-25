/* eslint-disable jsx-a11y/label-has-associated-control */
import { PhotoIcon } from '@heroicons/react/24/solid';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';

interface FormikValues {
  coverPhoto: string;
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
  correctAnswer: string;
}

interface CreateProps {
  handleSubmit: (values: FormikValues) => void;
}

export default function QuestionsList({ handleSubmit }: CreateProps) {
  const [alternatives, setAlternatives] = useState<number>(2);

  const initialValues = {
    coverPhoto: '',
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
    correctAnswer: '',
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('A questão é obrigatória'),
    alternative1: Yup.string().required('A alternativa A é obrigatória'),
    alternative2: Yup.string().required('A alternativa B é obrigatória'),
    alternative3: Yup.string(),
    alternative4: Yup.string(),
    alternative5: Yup.string(),
    concurso: Yup.string().required('O campo Concurso é obrigatório'),
    area: Yup.string().required('O campo Área é obrigatório'),
    subject: Yup.string().required('O campo Matéria é obrigatório'),
    level: Yup.string().required('O campo Nível é obrigatório'),
    correctAnswer: Yup.string().required('A resposta correta é obrigatória'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
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
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6"
                >
                  Imagem da questão (Ainda não funcionando)
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-200/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600  dark:text-gray-300">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="question"
                  className="block text-sm font-medium leading-6"
                >
                  Questão
                </label>
                <div className="mt-2">
                  <textarea
                    id="question"
                    name="question"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue=""
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
              {alternatives === 2 && (
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="alternative1"
                      className="block text-sm font-medium leading-6"
                    >
                      Verdadeiro
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="alternative1"
                        id="alternative1"
                        placeholder="Correta"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="alternative2"
                      className="block text-sm font-medium leading-6"
                    >
                      Falso
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="alternative2"
                        id="alternative2"
                        placeholder="Errada"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              )}
              {alternatives > 2 && (
                <>
                  <div className="col-span-full">
                    <label
                      htmlFor="alternative1"
                      className="block text-sm font-medium leading-6"
                    >
                      Alternativa A
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="alternative1"
                        name="alternative1"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="alternative1"
                      className="block text-sm font-medium leading-6"
                    >
                      Alternativa B
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="alternative1"
                        name="alternative1"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue=""
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="alternative1"
                      className="block text-sm font-medium leading-6"
                    >
                      Alternativa C
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="alternative1"
                        name="alternative1"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue=""
                      />
                    </div>
                  </div>
                </>
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
                    <textarea
                      id="alternative1"
                      name="alternative1"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue=""
                    />
                  </div>
                </div>
              )}
              {alternatives > 4 && (
                <div className="col-span-full">
                  <label
                    htmlFor="alternative1"
                    className="block text-sm font-medium leading-6"
                  >
                    Alternativa E
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="alternative1"
                      name="alternative1"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue=""
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
                    <select
                      id="concurso"
                      name="concurso"
                      className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={2}>Petrobrás 2010</option>
                      <option value={3}>Fundação Saúde</option>
                    </select>
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
                    <select
                      id="area"
                      name="area"
                      className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={1}>Segurança do Trabalho</option>
                      <option value={2}>Engenharia Civil</option>
                    </select>
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
                    <select
                      id="subject"
                      name="subject"
                      className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={1}>NR 12</option>
                      <option value={2}>NR 15 - Insalubridade</option>
                    </select>
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
                    <select
                      id="level"
                      name="level"
                      className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value={1}>Superior</option>
                      <option value={2}>Técnico</option>
                      <option value={2}>Médio</option>
                    </select>
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
                {alternatives === 2 && (
                  <div className="flex justify-around items-center mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6"
                      >
                        Verdadeira
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6"
                      >
                        Errada
                      </label>
                    </div>
                  </div>
                )}
                <div className="flex justify-around items-center mt-6 space-y-6">
                  {alternatives > 2 && (
                    <>
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
                      <div className="flex items-center gap-x-3">
                        <Field
                          id="answer3"
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
                    </>
                  )}
                  {alternatives > 3 && (
                    <div className="flex items-center gap-x-3">
                      <Field
                        id="answer4"
                        name="answer"
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
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-800 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
