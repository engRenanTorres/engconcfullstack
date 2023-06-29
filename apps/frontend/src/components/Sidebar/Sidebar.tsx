import {
  Bars3Icon,
  HomeIcon,
  ListBulletIcon,
  PencilSquareIcon,
  SquaresPlusIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';
import { useCallback, useEffect, useState } from 'react';
import defaultTWCss from '../../styles/theme';
import { ItemsGroupTitle, MItem } from './SbItems';
import useAuth from '../../utils/hooks/useAuth';
import AuthRoles from '../../helpers/auth-roles.helper';

export default function Sidebar() {
  const location = window.location.pathname;
  const { icons, bgGradient } = defaultTWCss;
  const [selected, setSelected] = useState<string>('Página inicial');
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { rolesStrings, workerRoles } = AuthRoles;

  const handleLocation = useCallback(() => {
    setSelected(location);
  }, [location]);

  useEffect(() => {
    handleLocation();
  }, [handleLocation, location]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <aside
      className={`${bgGradient} overflow-y-auto dark:text-neutral-200 w-${
        collapsed ? 12 : 60
      } h-auto block border-r border-neutral-200
           px-${collapsed ? 2 : 4}`}
    >
      {collapsed && (
        <div className="flex py-3 justify-center">
          <button
            type="button"
            className="mb-3 flex justify-center"
            onClick={() => {
              handleCollapse();
            }}
          >
            <Bars3Icon className={icons} />
          </button>
        </div>
      )}
      {!collapsed && (
        <button
          type="button"
          className="w-full mb-3 p-3 flex justify-between text-blue-100"
          onClick={() => {
            handleCollapse();
          }}
        >
          {currentUser ? rolesStrings[currentUser.roles - 1] : 'Visitante'}
          <XMarkIcon className={icons} />
        </button>
      )}
      {!collapsed && (
        <div className="flex-1 items-center mb-12">
          <img
            className="mx-auto h-28 w-auto"
            // src={logoImg}
            src="/favicon.svg"
            alt="Your Company"
          />
          <h2 className="text-center  text-blue-100 text-lg">
            Engenharia de Concursos
          </h2>
          {/* <h3 className="text-center text-blue-100">Simulador de Provas</h3> */}
          <h3 className="text-center text-blue-100">Under construction V.0.1.0</h3>
        </div>
      )}
      <menu>
        <MItem
          title="Página inicial"
          to="/"
          collapsed={collapsed}
          icon={<HomeIcon className={icons} />}
          selected={selected}
          setSelected={setSelected}
        />

        {!collapsed && <ItemsGroupTitle>Questões </ItemsGroupTitle>}
        <MItem
          to="/questions"
          title="Listar"
          icon={<ListBulletIcon className={icons} />}
          collapsed={collapsed}
          selected={selected}
          setSelected={setSelected}
        />
        {currentUser && workerRoles.includes(currentUser.roles) && (
          <>
            <MItem
              to="/questions/create"
              title="Nova Questão"
              icon={<SquaresPlusIcon className={icons} />}
              collapsed={collapsed}
              selected={selected}
              setSelected={setSelected}
            />

            <MItem
              to="/underConstruction"
              title="Editar Questões"
              icon={<PencilSquareIcon className={icons} />}
              collapsed={collapsed}
              selected={selected}
              setSelected={setSelected}
            />
          </>
        )}
        {!collapsed && <ItemsGroupTitle>sobre </ItemsGroupTitle>}
        <MItem
          to="/underConstruction"
          title="Sobre nós"
          icon={<UserCircleIcon className={icons} />}
          collapsed={collapsed}
          selected={selected}
          setSelected={setSelected}
        />
      </menu>
    </aside>
  );
}
