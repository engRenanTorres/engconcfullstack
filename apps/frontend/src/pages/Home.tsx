import { ContactsComp } from '../components/ContactsComp';
import HomeContent from '../containers/home/Home';
import HomeSideContent from '../containers/home/HomeSideContent';
import DefaultLayout from '../components/layout/DefaultLayout';

function Home() {
  return (
    <DefaultLayout
      jumbotronTitle="Engenharia de concursos"
      jumbotronSubtitle="Simulador de concursos de engenharia"
      sideContent={HomeSideContent}
      sideContent2={
        <ContactsComp linkedin="https://www.linkedin.com/in/eng-renan-torres/" />
      }
    >
      <HomeContent />
    </DefaultLayout>
  );
}

export default Home;
