import { memo } from "react";

type Props = {
  arrCategory: string[];
  setFilterCategory: (value: string) => void;
  filterCategory: string;
};

const Filter = memo(
  ({ arrCategory, setFilterCategory, filterCategory }: Props) => {
    return (
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
    );
  }
);
export default Filter;
