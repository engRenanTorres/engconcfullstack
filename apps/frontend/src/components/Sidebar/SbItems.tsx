import { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { NavLink } from 'react-router-dom';
import defaultTWCss from '../../styles/theme';

type PropsItem = {
  title: string;
  to: string;
  collapsed: boolean;
  icon: ReactNode;
  selected?: string;
  setSelected: Dispatch<SetStateAction<string>>;
};

export function MItem({
  title,
  icon,
  to,
  selected = '',
  collapsed,
  setSelected,
}: PropsItem): ReactElement<PropsItem> {
  return (
    <div
      className={
        selected === to
          ? `w-full rounded-lg my-4 py-2 ${defaultTWCss.bgSelected}`
          : 'w-full rounded-lg my-4 py-2 text-neutral-200'
      }
    >
      <button type="button" onClick={() => setSelected(title)}>
        <NavLink
          to={to}
          className={
            collapsed
              ? 'flex w-full ml-0 justify-center'
              : 'flex w-full ml-4 justify-start'
          }
        >
          {icon}
          {!collapsed && (
            <span className="ml-2 text-sm hover:font-bold">{title}</span>
          )}
        </NavLink>
      </button>
    </div>
  );
}
type Props = {
  children: string;
};

export function ItemsGroupTitle({ children }: Props): ReactElement<Props> {
  return (
    <h6
      className={`flex justify-start mx-2 mb-2 mt-4 text-xs  text-blue-100${defaultTWCss.textColor}`}
    >
      {children}
    </h6>
  );
}

MItem.defaultProps = {
  selected: 'some default',
};
