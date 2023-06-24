import { ContactsComp } from '../../components/ContactsComp';
import HomeSideContent from '../../containers/home/HomeSideContent';
import DefaultLayout from '../../components/layout/DefaultLayout';
import QuestionsList from '../../containers/questions/CreateQuestions';

function CreateQuestions() {
  return (
    <DefaultLayout
      jumbotronTitle="Engenharia de concursos"
      jumbotronSubtitle="Simulador de concursos de engenharia"
      sideContent={HomeSideContent}
      sideContent2={
        <ContactsComp linkedin="https://www.linkedin.com/in/eng-renan-torres/" />
      }
    >
      <QuestionsList />
    </DefaultLayout>
  );
}

export default CreateQuestions;
