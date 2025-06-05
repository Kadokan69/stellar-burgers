import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUserThunk } from '../../features/user/userSlice';
import { Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispath = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, loginUserError } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispath(loginUserThunk({ email: email, password: password }));
  };

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  // asdf1@mail.ru
  // QazWsxEdc3139538
  return (
    <LoginUI
      errorText={loginUserError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
