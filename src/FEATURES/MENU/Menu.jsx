import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../SERVICES/apiRestaurant';
import MenuItem from './MenuItem';
function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="divide-y-8 divide-stone-200 px-2">
      {menu.map((pizzaItem) => (
        <MenuItem pizza={pizzaItem} key={pizzaItem.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
