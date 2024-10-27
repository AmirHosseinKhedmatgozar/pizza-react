import Button from '../../UI/Button';
import { useDispatch } from 'react-redux';
import { deleteItem } from './cardSlice';
function DeleteItem({ itemID }) {
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(deleteItem(itemID));
  }
  return (
    <Button type="small" onClick={handleClick}>
      DELETE
    </Button>
  );
}

export default DeleteItem;
