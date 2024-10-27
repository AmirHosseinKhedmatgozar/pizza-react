import { useSelector } from 'react-redux';
import CreateUser from '../FEATURES/USER/CreateUser';
import Button from './Button';

function Home() {
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="my-10 px-4 text-center">
      <h1 className="mb-4 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName === '' ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          continio ordering ,{userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
