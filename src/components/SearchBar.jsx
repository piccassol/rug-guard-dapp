import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) navigate(`/analysis/${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar-container">
      <input
        type="text"
        placeholder="Search tokens by name, symbol, or contract address..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-bar"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
