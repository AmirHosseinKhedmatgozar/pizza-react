import { Link } from 'react-router-dom';
import SearchOrder from '../FEATURES/ORDER/SearchOrder';
import UserName from '../FEATURES/USER/UserName';

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-500 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
