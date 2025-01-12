import React from 'react'

const Search = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      <input 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />
    </div>
  );
};

export default Search