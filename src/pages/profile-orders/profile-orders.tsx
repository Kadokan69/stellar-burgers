import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrdersThunk } from '../../features/order/orderSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  // dispatch(getOrdersThunk());
  /** TODO: взять переменную из стора */
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, []);
  const orders: TOrder[] = useSelector((state) => state.orderData.orders);
  return <ProfileOrdersUI orders={orders} />;
};
