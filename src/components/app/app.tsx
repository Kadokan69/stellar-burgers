import { Routes, Route } from 'react-router-dom';
import { useLocation, useMatch, useNavigate } from 'react-router';
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
import { getUserThunk } from '../../features/user/userSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const feedOrderID = useMatch('/feed/:number')?.params?.number;
  const profileOrderID = useMatch('/profile/orders/:number')?.params?.number;
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredientsData());

    dispatch(getUserThunk());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route element={<ProtectedRoute onlyUnAuth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />

        <Route
          path='/feed/:number'
          element={
            <>
              <h3 className={`${styles.title} text text_type_digits-default`}>
                #{feedOrderID}
              </h3>
              <OrderInfo />
            </>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <>
              <h3 className={`${styles.title} text text_type_main-large`}>
                Детали ингредиента
              </h3>

              <IngredientDetails />
            </>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <>
              <h3 className={`${styles.title} text text_type_digits-default`}>
                #{profileOrderID}
              </h3>
              <OrderInfo />{' '}
            </>
          }
        />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${feedOrderID}`}
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
                title={`#${profileOrderID}`}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
