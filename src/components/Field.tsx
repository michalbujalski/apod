import { FC } from 'react';

interface Props {
  label: string;
  text: string;
}
const Field: FC<Props> = ({ label, text }) => {
  return (
    <div className="field">
      <h3>{label}</h3>
      <div className="field__content">{text}</div>
    </div>
  );
};

export default Field;
