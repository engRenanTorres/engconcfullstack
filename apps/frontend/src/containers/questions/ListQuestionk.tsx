import { useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useQuery } from 'react-query';
import { Question } from '../../interfaces/questionInterface';
import axiosClient from '../../utils/httpClient/axiosClient';

const questionsDefault: Question[] = [
  {
    question: 'Teria um erro no carregamento?',
    answer: 'V',
    tip: 'questao muito facil',
    level: { id: 1, name: 'Superior', about: '00000000000' },
    subject: {
      id: 2,
      name: 'NR12',
      about: 'Segurança em Máquinas',
      area: {
        id: 2,
        name: 'Engenharia de Segurança do Trabalho',
        about: '00000000002',
      },
    },
    questionsChoices: [
      { id: 1, choice: 'A) sim' },
      { id: 2, choice: 'B) não' },
    ],
    concurso: {
      id: 4,
      name: 'Fundação Saúde do Rio de Janeiro',
      about: '00000000002',
      year: 2022,
      institute: {
        id: 1,
        name: 'FGV',
        about: '00000000000',
        contact: 'adm@adm.com',
      },
    },
    createdBy: {
      id: 1,
      name: 'Adm',
      email: 'adm@adm.com',
      roles: 1,
      cnpj: '00000000000',
    },
    id: 1,
    createdAt: '2023-05-11',
  },
];
function ListQuestionContent() {
  const { data, isLoading, error } = useQuery<Question[]>(
    'questions',
    () => {
      return axiosClient.get('/question').then((response) => response.data);
    },
    { retry: 3 }
  );
  const questions = data ?? questionsDefault;
  if (isLoading) {
    return <div>Carregando Questões...</div>;
  }

  if (error) {
    return <div>Erro na busca de questões</div>;
  }

  return (
    <div className="flex flex-col text-sm">
      <h2 className="italic font-semibold mb-2 text-lg">Lista de questões</h2>
      {questions.map((question) => (
        <div
          key={uuidV4()}
          className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-5 mb-6 border-b border-black dark:border-white"
        >
          <div>
            <p className="lg:text-justify">Questão de id: {question.id}</p>
            <p className="lg:text-justify py-5">{question.question}</p>
            {question.questionsChoices.map((choice) => (
              <p
                key={uuidV4()}
                className="border border-black rounded-lg dark:border-white p-2 m-4"
              >
                {choice.choice}
              </p>
            ))}
            <p className="pb-2">Resposta: {question.answer}</p>
            {question.tip && (
              <p className="pb-6">
                Dicas sobre a questão: <br /> {question.tip}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-around items-around h-full">
            <div className="flex flex-col justify-around items-around">
              <p className="italic">banca:</p>
              <p>{question.concurso.institute.name}</p>
              <p className="italic">concurso:</p>
              <p>{question.concurso.name}</p>
              <p className="italic">ano:</p>
              <p>{question.concurso.year}</p>
              <p className="italic">nível:</p>
              <p>{question.level.name}</p>
            </div>
            <p className="border-b w-fit border-black dark:border-neutral-200 text-xs">
              Criada em <br /> <span>{question.createdAt} por </span>{' '}
              {question.createdBy.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListQuestionContent;
