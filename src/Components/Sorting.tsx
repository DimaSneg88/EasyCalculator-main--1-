type Props = {
  setSort: (value: string) => void;
  sortDate: (value: string) => void;
  arrCategory: string[];
  setFilterCategory: (value: string) => void;
  filterCategory: string;
};

export default function Sorting({
  setSort,
  sortDate,
  arrCategory,
  setFilterCategory,
  filterCategory,
}: Props) {
  return (
    <div className="sort-section">
      <div className="sort-controls">
        Сортировка:
        <select
          className="sort-select"
          onChange={(e) => {
            setSort(e.target.value);
            sortDate(e.target.value);
          }}
          defaultValue="date-desc"
        >
          <option value="date-desc">По дате (сначала новые)</option>
          <option value="date-asc">По дате (сначала старые)</option>
          <option value="sum-desc">По сумме (от большего к меньшему)</option>
          <option value="sum-asc">По сумме (от меньшего к большему)</option>
          <option value="name">По названию</option>
        </select>
      </div>
      <div className="sort-controls">
        Фильтр по категории:
        <select
          className="filter-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {arrCategory.map((el, index) => {
            console.log(el);
            return (
              <option key={index} value={el}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
