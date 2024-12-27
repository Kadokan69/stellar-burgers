import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNumberThunk } from '../../features/order/orderSlice';
import { useParams } from 'react-router-dom';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ number: string }>();
  const id = Number(params.number);
  useEffect(() => {
    dispatch(getOrderByNumberThunk(id));
  }, [dispatch]);
  /** TODO: взять переменные orderData и ingredients из стора */
  const pandingOrder = useSelector((state) => state.orderData.orderRequest);
  const orderData = useSelector((state) => state.orderData.orderProfile[0]);
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.ingredients
  );
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || pandingOrder) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};