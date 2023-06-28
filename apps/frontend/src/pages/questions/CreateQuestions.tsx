/* eslint-disable import/no-cycle */
import { useNavigate } from 'react-router-dom';
import QuestionsList from '../../containers/questions/CreateQuestions';
import axiosClient from '../../utils/httpClient/axiosClient';
import QuestionLayout from '../../components/layout/QuestionLayout';

export interface FormikCreateQuestionValues {
  question: string;
  alternatives: number;
  alternative1: string;
  alternative2: string;
  alternative3: string;
  alternative4: string;
  alternative5: string;
  concurso: number;
  // area: string;
  subject: number;
  level: number;
  answer: string;
  tip: string;
}

function CreateQuestions() {
  const navigate = useNavigate();
  const handleSubmit = async (values: FormikCreateQuestionValues) => {
    // console.log(values);
    const alteratives = [];
    alteratives.push({
      choice: values.alternative1 === '' ? 'Correta' : values.alternative1,
    });
    alteratives.push({
      choice: values.alternative2 === '' ? 'Errada' : values.alternative2,
    });
    if (values.alternative3 !== '')
      alteratives.push({ choice: values.alternative3 });
    if (values.alternative4 !== '')
      alteratives.push({ choice: values.alternative4 });
    if (values.alternative5 !== '')
      alteratives.push({ choice: values.alternative5 });

    const { status } = await axiosClient.post('/question', {
      question: values.question,
      answer: values.answer,
      tip: values.tip,
      questionsChoices: alteratives,
      levelId: +values.level,
      subjectId: +values.subject,
      concursoId: +values.concurso,
    });

    if (status === 201) {
      alert('Questão criada com sucesso.');
      navigate('/');
    } else {
      alert(`erro ao criar a questão status: ${status}`);
    }
  };
  return (
    <QuestionLayout
      jumbotronTitle="Engenharia de concursos"
      jumbotronSubtitle="Simulador de concursos de engenharia"
    >
      <QuestionsList handleSubmit={handleSubmit} />
    </QuestionLayout>
  );
}

export default CreateQuestions;
