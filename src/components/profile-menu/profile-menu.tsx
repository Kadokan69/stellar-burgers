import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '../../features/user/userSlice';

export const ProfileMenu: FC = () => {
  const dispath = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispath(logoutUserThunk());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
