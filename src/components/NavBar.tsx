import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FC } from 'react';
import './NavBar.scss';

interface Props {
  backUrl?: string;
  actions?: React.ReactNode;
  title?: string;
}
const NavBar: FC<Props> = ({ backUrl, actions, title }) => {
  return (
    <nav className="navbar">
      {backUrl && (
        <Button sx={{ color: 'white' }} href={backUrl}>
          <ArrowBack />
        </Button>
      )}
      <span className="title">{title}</span>
      <div>{actions}</div>
    </nav>
  );
};

export default NavBar;
