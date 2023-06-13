type Props = {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
};

export const ContactsComp: React.FC<Props> = ({
  facebook,
  twitter,
  linkedin,
  website,
}: Props) => {
  return (
    <div className="text-sm p-4">
      <h4 className="italic font-semibold mb-2">Mídias Sociais</h4>
      <ol className="list-unstyled">
        {!!website && (
          <li>
            <a href={website}>Facebook</a>
          </li>
        )}
        {!!facebook && (
          <li>
            <a href={facebook}>Facebook</a>
          </li>
        )}
        {!!twitter && (
          <li>
            <a href={twitter}>Twitter</a>
          </li>
        )}
        {!!linkedin && (
          <li>
            <a href={linkedin}>LinkedIn</a>
          </li>
        )}
      </ol>
    </div>
  );
};
