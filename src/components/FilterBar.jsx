import React from 'react';

const FilterBar = ({ setGenre, setYear }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-2">
      <select onChange={(e) => setGenre(e.target.value)} className="p-2 rounded border">
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="18">Drama</option>
        <option value="878">Sci-Fi</option>
        <option value="80">Crime</option>
      </select>

      <select onChange={(e) => setYear(e.target.value)} className="p-2 rounded border">
        <option value="">All Years</option>
        <option value="2010">2010</option>
        <option value="2014">2014</option>
        <option value="2008">2008</option>
        <option value="2008">2008</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>
    </div>
  );
};

export default FilterBar;
