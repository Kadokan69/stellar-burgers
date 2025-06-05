import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '../../features/constructor/constructorBurgerSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispath = useDispatch();
    const handleMoveDown = () => {
      dispath(moveIngredientDown({ ingredient, index }));
    };

    const handleMoveUp = () => {
      dispath(moveIngredientUp({ ingredient, index }));
    };

    const handleClose = () => {
      dispath(removeIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
