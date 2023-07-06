import { useInfiniteQuery } from 'react-query';
import React from 'react';
import { Question } from '../../interfaces/questionInterface';
import axiosClient from '../../utils/httpClient/axiosClient';

function ListQuestionContent() {
  const fetchQuestions = async ({ pageParam = 0 }): Promise<Question[]> => {
    const response = await axiosClient.get('/question/pageable', {
      params: { page: pageParam, limit: 4 },
    });
    return response.data;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<any, 'questions'>('questions', fetchQuestions, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
  if (data === undefined) {
    return <div>Nenhuma questão encontrada. </div>;
  }

  if (isLoading) {
    return <div>Carregando Questões...</div>;
  }

  if (error) {
    return <div>Erro na busca de questões</div>;
  }

  return (
    <div className="flex flex-col text-sm">
      <h2 className="italic font-semibold mb-2 text-lg">Lista de questões</h2>

      {data.pages.map((page, pageIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={pageIndex}>
          {page?.questions?.map((question: Question) => (
            <div
              key={question.id}
              className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-5 mb-6 border-b border-black dark:border-white"
            >
              <div>
                <p className="lg:text-justify">Questão de id: {question.id}</p>
                <p className="lg:text-justify py-5">{question.question}</p>
                {question.questionsChoices.map((choice) => (
                  <p
                    key={choice.id}
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
        </React.Fragment>
      ))}

      {hasNextPage}

      {hasNextPage && (
        // eslint-disable-next-line react/button-has-type
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Carregando mais...' : 'Carregar mais'}
        </button>
      )}
    </div>
  );
}

export default ListQuestionContent;
