import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cardSlice';

function UpdateItemQuantity({ pizzaId, currenQuantity }) {
  const dispatch = useDispatch();

  function handlePlusClick() {
    dispatch(increaseItemQuantity(pizzaId));
  }
  function handleMinesClick() {
    dispatch(decreaseItemQuantity(pizzaId));
  }
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleMinesClick}>
        -
      </Button>
      <span className="text-sm font-bold">{currenQuantity}</span>
      <Button type="round" onClick={handlePlusClick}>
        +
      </Button>
    </div>
  );
}
export default UpdateItemQuantity;
