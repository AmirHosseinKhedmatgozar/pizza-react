import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalQuantity, getTotalPrice } from './cardSlice';
import { formatCurrency } from '../../UTILS/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  if (!totalPrice) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-3 font-semibold text-stone-300">
        <span>{totalCartQuantity} pizzas</span>
        <span> {formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/card">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
