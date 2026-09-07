const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      <label>filter</label>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

export default Filter;
