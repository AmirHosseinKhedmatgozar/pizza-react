import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './UI/Home';
import Menu, { loader as menuLoader } from './FEATURES/MENU/Menu';
import Card from './FEATURES/CARD/Card';
import Order, { loader as orderLoader } from './FEATURES/ORDER/Order';
import CreateOrder, {
  action as actionFormOrder,
} from './FEATURES/ORDER/CreateOrder';
import { action as actionUpdateOrder } from './FEATURES/ORDER/UpdateOrder';
import AppLayout from './UI/AppLayout';
import Error from './UI/Error';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: 'card', element: <Card /> },
      { path: 'order/new', element: <CreateOrder />, action: actionFormOrder },
      {
        path: 'order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: actionUpdateOrder,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
