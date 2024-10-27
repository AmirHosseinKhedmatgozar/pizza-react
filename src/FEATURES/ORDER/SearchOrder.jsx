import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="SEARCH ORDER #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm outline-none transition-all duration-300 placeholder:text-stone-500 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
