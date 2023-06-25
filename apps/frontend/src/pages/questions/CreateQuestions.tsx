import { ContactsComp } from '../../components/ContactsComp';
import HomeSideContent from '../../containers/home/HomeSideContent';
import DefaultLayout from '../../components/layout/DefaultLayout';
import QuestionsList from '../../containers/questions/CreateQuestions';

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

function CreateQuestions() {
  const handleSubmit = (values: FormikValues) => {
    console.log(values);
  };
  return (
    <DefaultLayout
      jumbotronTitle="Engenharia de concursos"
      jumbotronSubtitle="Simulador de concursos de engenharia"
      sideContent={HomeSideContent}
      sideContent2={
        <ContactsComp linkedin="https://www.linkedin.com/in/eng-renan-torres/" />
      }
    >
      <QuestionsList handleSubmit={handleSubmit} />
    </DefaultLayout>
  );
}

export default CreateQuestions;
