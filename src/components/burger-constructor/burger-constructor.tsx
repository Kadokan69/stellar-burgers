import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { orderThunk } from '../../features/order/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state) => state.getConstructorBurger.burgerConstructor
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const { orderRequest } = useSelector((state) => state.orderData);

  const orderModalData = useSelector((state) => state.orderData.order);

  const onOrderClick = () => {
    if (!isAuthenticated) return navigate('/login', { replace: true });
    if (constructorItems.bun && constructorItems.ingredients) {
      dispath(
        orderThunk(
          constructorItems.ingredients
            .map((item) => item._id)
            .concat(constructorItems.bun._id, constructorItems.bun._id)
        )
      );
    }
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
