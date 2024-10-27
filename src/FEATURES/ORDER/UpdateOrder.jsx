import { useFetcher } from 'react-router-dom';
import Button from '../../UI/Button';
import { updateOrder } from '../../SERVICES/apiRestaurant';

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH">
      <Button type="primary">MAKE PRORITY</Button>
    </fetcher.Form>
  );
}
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
export default UpdateOrder;
