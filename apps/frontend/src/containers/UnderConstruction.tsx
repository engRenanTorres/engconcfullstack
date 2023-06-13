import { Link } from 'react-router-dom';

const UnderConstruction: React.FC = () => {
  // if (!currentUser) return router.push('/');
  return (
    <div className="mb-2 px-2 text-center flex-1 justify-center">
      <h2>Está página ainda está em desenvolvimento.</h2>
      <hr className="mt-5" />
      <section className="flex-1 py-9">
        Deseja voltar para a página inicial?
        <br />
        <Link
          className="font-semibold leading-6 text-indigo-600 dark:text-purple-300 hover:text-indigo-500"
          to="/"
        >
          Voltar a página inicial
        </Link>
      </section>
    </div>
  );
};

export default UnderConstruction;
