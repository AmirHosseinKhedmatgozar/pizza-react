import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../FEATURES/CARD/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  return (
    <div className="grid h-screen grid-rows-[auto,1fr,auto]">
      {navigation.state === 'loading' && <Loader />}
      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
