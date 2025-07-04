import { memo } from "react";

type Props = {
  setSort: (value: string) => void;
  sortDate: (value: string) => void;
};

const Sorting = memo(({ setSort, sortDate }: Props) => {
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
    </div>
  );
});
export default Sorting;
