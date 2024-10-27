import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import { formatCurrency } from '../../UTILS/helpers';
import { addItem, getCurrentQuantity } from '../CARD/cardSlice';
import DeleteItem from '../CARD/DeleteItem';
import UpdateItemQuantity from '../CARD/UpdateItemQuantity';
function MenuItem({ pizza }) {
  const dispatch = useDispatch();

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currenQuantity = useSelector(getCurrentQuantity(id));
  function handleAddToCard() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>

        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && currenQuantity >= 1 && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currenQuantity={currenQuantity}
              />
              <DeleteItem itemID={id} />
            </div>
          )}

          {!soldOut && currenQuantity < 1 && (
            <Button type="small" onClick={handleAddToCard}>
              Add to Card
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
