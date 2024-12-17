import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router';
import {
  ConstructorPage,
  Feed,
  NotFound404,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import {
  AppHeader,
  ProtectedRoute,
  Modal,
  OrderInfo,
  IngredientDetails
} from '@components';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredientsData } from '../../features/ingredient/ingredientsSlice';
import { fetchFeedData } from '../../features/feed/feedSlice';
import { getUserThunk } from '../../features/user/userSlice';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredientsData());
    dispatch(fetchFeedData());
    if (getCookie('accessToken')) {
      dispatch(getUserThunk());
    }
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={''}
              onClose={() => {
                navigate(-1);
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal
              title={'Детали ингредиента'}
              onClose={() => {
                navigate(-1);
              }}
            >
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal
              title={''}
              onClose={() => {
                navigate(-1);
              }}
            >
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
