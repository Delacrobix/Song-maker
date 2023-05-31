import React, { useState } from 'react';

const Sort = () => {
  const [search, setSearch] = useState([]);

  function handleChange(event) {
    setSearch(event.target.value);
    event.preventDefault();
  }

  return (
    <div className='search-input-container'>
      <input
        type='search'
        value={search}
        placeholder='Search'
        className='search-input'
        onChange={handleChange}
      />
    </div>
  );
};

export default Sort;
