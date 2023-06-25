/* eslint-disable jsx-a11y/anchor-is-valid */
function HomeContent() {
  return (
    <div className="flex-1 text-sm">
      <h2 className="italic font-semibold mb-2 text-lg">
        Simulador de concursos de engenharias
      </h2>
      <p className="border-b w-fit border-black dark:border-neutral-200 text-xs">
        <span>1 de maio de 2023 por</span> <a href="#">Renan Torres</a>
      </p>

      <p className="lg:text-justify py-5">
        Este é um projeto independente que pretende contribuir com a engenharia.
        Não só para concurseiros, mas para todos que queiram praticar seus
        conhecimentos.
      </p>
      <p className="lg:text-justify py-5">
        Este é um projeto que está em desenvolvimento. Por se tratar de um
        projeto colaborativo sem pretenção real de sustento financeiro, a
        disponibilidade de recursos se dá de forma gradativa de acordo com a
        disponibilidade dos voluntários.
      </p>
      <p className="lg:text-justify">
        O foco do projeto são os aplicativos mobile. No entando, também será
        possível realizar simulados mais simplificados aqui na web. O cadastro é
        gratuito e opcional. Ele será utilizado em breve apenas para uma área de
        estatísticas para auxiliar nos estudos.
      </p>
      <blockquote>
        <p className="text-center py-5 italic">
          {/* eslint-disable-next-line react/no-unescaped-entities  */}
          "Coragem! Mais vale errar, se arrebentando, do que poupar-se
          {/* eslint-disable-next-line react/no-unescaped-entities  */}
          para nada."
        </p>
      </blockquote>
      <p className="text-end">Darcy Ribeiro.</p>
    </div>
  );
}

export default HomeContent;
