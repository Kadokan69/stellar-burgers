import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { orderThunk, resetOrder } from '../../features/order/orderSlice';
import { clearIngredient } from '../../features/constructor/constructorBurgerSlice';

export const BurgerConstructor: FC = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(
    (state) => state.getConstructorBurger.burgerConstructor
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const { orderRequest, orderModalData } = useSelector(
    (state) => state.orderData
  );

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
      dispath(clearIngredient());
    }
  };
  const closeOrderModal = () => {
    dispath(resetOrder());
  };

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
