const questionsDefault = [
  {
    question: 'Seria eu renan?',
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
      { id: 1, choice: 'A) Certo' },
      { id: 2, choice: 'B) Errado' },
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
    lastUpdateBy: null,
    lastUpdateAt: null,
    id: 1,
    createdAt: null,
  },
  {
    question: 'Quem é o cara mais legal?',
    answer: 'A',
    tip: 'questao obvia.',
    level: { id: 2, name: 'Técnico', about: '00000000002' },
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
      { id: 3, choice: 'A) Renan' },
      { id: 4, choice: 'B) Guerra' },
      { id: 5, choice: 'C) Guerra' },
      { id: 6, choice: 'D) Peçanha' },
      { id: 7, choice: 'E) Noira' },
    ],
    concurso: {
      id: 3,
      name: 'Petrobras',
      about: 'Top',
      year: 2023,
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
    lastUpdateBy: null,
    lastUpdateAt: null,
    id: 2,
    createdAt: null,
  },
  {
    question: 'Onde fica o Brasil',
    answer: 'A',
    tip: 'string',
    level: { id: 1, name: 'Superior', about: '00000000000' },
    subject: {
      id: 1,
      name: 'Engenharia de Segurança do Trabalho',
      about: '00000000002',
      area: { id: 1, name: 'Engenharia Civil', about: 'IamAdm123' },
    },
    questionsChoices: [{ id: 10, choice: 'alabama' }],
    concurso: {
      id: 3,
      name: 'Petrobras',
      about: 'Top',
      year: 2023,
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
    lastUpdateBy: null,
    lastUpdateAt: '2023-06-22',
    id: 5,
    createdAt: '2023-06-22',
  },
  {
    question: 'Onde fica o Brasil',
    answer: 'A',
    tip: 'string',
    level: { id: 1, name: 'Superior', about: '00000000000' },
    subject: {
      id: 1,
      name: 'Engenharia de Segurança do Trabalho',
      about: '00000000002',
      area: { id: 1, name: 'Engenharia Civil', about: 'IamAdm123' },
    },
    questionsChoices: [{ id: 11, choice: 'alabama' }],
    concurso: {
      id: 3,
      name: 'Petrobras',
      about: 'Top',
      year: 2023,
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
    lastUpdateBy: null,
    lastUpdateAt: '2023-06-22',
    id: 6,
    createdAt: '2023-06-22',
  },
  {
    question: 'Sou o favorito do Pirulito?',
    answer: 'V',
    tip: 'Sim',
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
      { id: 12, choice: 'Correta' },
      { id: 13, choice: 'Errada' },
      { id: 14, choice: 'sdf' },
      { id: 15, choice: 'das' },
    ],
    concurso: {
      id: 3,
      name: 'Petrobras',
      about: 'Top',
      year: 2023,
      institute: {
        id: 1,
        name: 'FGV',
        about: '00000000000',
        contact: 'adm@adm.com',
      },
    },
    createdBy: {
      id: 3,
      name: 'Renan',
      email: 'renstorres@gmail.com',
      roles: 1,
      cnpj: '12443560775',
    },
    lastUpdateBy: null,
    lastUpdateAt: '2023-06-25',
    id: 7,
    createdAt: '2023-06-25',
  },
  {
    question: 'Quem é quem?',
    answer: 'V',
    tip: 'asd',
    level: { id: 2, name: 'Técnico', about: '00000000002' },
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
      { id: 16, choice: 'Correta' },
      { id: 17, choice: 'Errada' },
    ],
    concurso: {
      id: 3,
      name: 'Petrobras',
      about: 'Top',
      year: 2023,
      institute: {
        id: 1,
        name: 'FGV',
        about: '00000000000',
        contact: 'adm@adm.com',
      },
    },
    createdBy: {
      id: 3,
      name: 'Renan',
      email: 'renstorres@gmail.com',
      roles: 1,
      cnpj: '12443560775',
    },
    lastUpdateBy: null,
    lastUpdateAt: '2023-06-26',
    id: 8,
    createdAt: '2023-06-26',
  },
];
function ListQuestionContent() {
  return (
    <div className="flex-1 text-sm">
      <h2 className="italic font-semibold mb-2 text-lg">
        Simulador de concursos de engenharias
      </h2>
      <p className="border-b w-fit border-black dark:border-neutral-200 text-xs">
        <span>1 de maio de 2023 por</span> Renan Torres
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

export default ListQuestionContent;
