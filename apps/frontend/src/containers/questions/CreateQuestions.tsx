/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import Concurso from '../../interfaces/concursoInterface';
import axiosClient from '../../utils/httpClient/axiosClient';
import Subject from '../../interfaces/subjectInterface';
import Level from '../../interfaces/levelInterface';
import { FormikCreateQuestionValues } from '../../pages/questions/CreateQuestions';

interface CreateProps {
  handleSubmit: (values: FormikCreateQuestionValues) => void;
}

const concursosDefault: Concurso[] = [
  {
    id: 1,
    name: 'Erro na busca',
    about: 'Sample data',
    year: 2023,
    institute: {
      id: 1,
      name: 'Erro na Busca',
      about: 'Sample data',
      contact: 'adm@adm.com',
    },
  },
];

const subjectsDefault: Subject[] = [
  {
    id: 1,
    name: 'Erro ao carregar',
    about: 'default',
    area: {
      id: 1,
      name: 'Erro ao carregar',
      about: 'default',
    },
  },
];
const levelsDefault: Level[] = [
  {
    id: 1,
    name: 'Erro ao carregar',
    about: 'default',
  },
];

export default function QuestionsList({ handleSubmit }: CreateProps) {
  const [alternatives, setAlternatives] = useState<number>(2);
  const [concursos, setConcursos] = useState<Concurso[]>(concursosDefault);
  const [subjects, setSubjects] = useState<Subject[]>(subjectsDefault);
  const [levels, setLevels] = useState<Level[]>(levelsDefault);

  const initialValues = {
    question: '',
    alternatives: 2,
    alternative1: 'Correta',
    alternative2: 'Errada',
    alternative3: '',
    alternative4: '',
    alternative5: '',
    concurso: concursos[0].id,
    // area: '',
    subject: subjects[0].id,
    level: levels[0].id,
    answer: '',
    tip: '',
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('A questão é obrigatória'),
    alternative1: Yup.string().required('A alternativa A é obrigatória'),
    alternative2: Yup.string().required('A alternativa B é obrigatória'),
    alternative3: Yup.string(),
    alternative4: Yup.string(),
    alternative5: Yup.string(),
    concursos: Yup.number(),
    subjects: Yup.number(),
    level: Yup.number(),
  });

  const handleChoices = (event: ChangeEvent<HTMLSelectElement>) => {
    setAlternatives(+event.target.value);
  };

  const handleConcursos = async () => {
    const { data } = await axiosClient.get('/concurso');
    setConcursos(data);
  };

  const handleSubjects = async () => {
    const { data } = await axiosClient.get('/subject');
    setSubjects(data);
  };

  const handleLevels = async () => {
    const { data } = await axiosClient.get('/level');
    setLevels(data);
  };

  useEffect(() => {
    handleConcursos();
    handleSubjects();
    handleLevels();
  }, []);
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
                  htmlFor="alt-qty"
                  className="block text-sm font-medium leading-6"
                >
                  Quantas alternativas?
                </label>
                <div className="mt-2">
                  <select
                    id="alt-qty"
                    name="alt-qty"
                    onChange={handleChoices}
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
                      placeholder={alternatives === 2 ? 'Correta' : ''}
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
                      placeholder={alternatives === 2 ? 'Errada' : ''}
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
                      <option value={0}> --- </option>
                      {concursos.map((concurso) => (
                        <option key={uuidv4()} value={concurso?.id}>
                          {concurso?.name} / {concurso?.institute?.name} /{' '}
                          {concurso?.year}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="concurso"
                      component="div"
                      className="text-sm text-red-700"
                    />
                  </div>
                </div>
              </div>
              {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
              </div> */}
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
                      <option value={0}> --- </option>
                      {subjects.map((subject) => (
                        <option key={uuidv4()} value={subject?.id}>
                          {subject?.name} / {subject?.area?.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="subject"
                      component="div"
                      className="text-sm text-red-700"
                    />
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
                      <option value={0}> --- </option>
                      {levels.map((level) => (
                        <option key={uuidv4()} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="level"
                      component="div"
                      className="text-sm text-red-700"
                    />
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
                    value={alternatives === 2 ? 'V' : 'A'}
                    name="answer"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6"
                  >
                    {alternatives === 2 ? 'Verdadeiro' : 'A)'}
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <Field
                    id="answer2"
                    value={alternatives === 2 ? 'F' : 'B'}
                    name="answer"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6"
                  >
                    {alternatives === 2 ? 'Falso' : 'B)'}
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
