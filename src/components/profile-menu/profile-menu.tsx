import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '../../features/user/userSlice';

export const ProfileMenu: FC = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispath(logoutUserThunk()).then(() =>
      navigate('/login', { replace: true })
    );
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
