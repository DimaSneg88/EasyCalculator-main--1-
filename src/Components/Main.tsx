import { useState, useMemo, memo } from "react";
import Sorting from "./Sorting";
import { arrCategory } from "../constants/category";
import type { IExpense } from "../type/expense";
import Filter from "./Filter";

type TMainProps = {
  expenses: IExpense[];
  setExpenses: (newExpenses: IExpense[]) => void;
};

function parseDate(dateString: string) {
  // Пример простого парсинга для даты в формате 'YYYY-MM-DD'
  const parts = dateString.split("-");
  return new Date(
    Number(parts[0]),
    Number(parts[1]) - 1,
    Number(parts[2])
  ).getTime(); // вернем время в миллисекундах
}

const Main = memo(({ expenses, setExpenses }: TMainProps) => {
  const [sortDate, setSortDate] = useState("date-desc");
  const [sortSum, setSortSum] = useState("sum-desc");
  const [filterCategory, setFilterCategory] = useState("Все категории");

  const deleteExpense = (id: number) => {
    setExpenses([...expenses].filter((expense) => expense.id !== id));
  };

  const filters = useMemo(() => {
    return filterCategory === "Все категории"
      ? expenses
      : expenses.filter((elem) => elem.category === filterCategory);
  }, [expenses, filterCategory]);

  const sortedExpenses = useMemo(() => {
    return [...filters].sort((a, b) => {
      if (sortSum === "sum-asc") return a.sum - b.sum;
      if (sortSum === "sum-desc") return b.sum - a.sum;

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      return sortDate === "date-asc" ? dateA - dateB : dateB - dateA;
    });
  }, [filters, sortSum, sortDate]);

  const totalSum = useMemo(() => {
    return filters.reduce((a, b) => a + b.sum, 0);
  }, [filters]);

  return (
    <div>
      <div className="section">
        <div className="head-section">
          <h2>Список затрат</h2>
          <div>
            <Sorting setSort={setSortSum} sortDate={setSortDate} />
          </div>
          <Filter
            arrCategory={arrCategory}
            setFilterCategory={setFilterCategory}
            filterCategory={filterCategory}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Описание</th>
              <th>Сумма</th>
              <th>Категория</th>
              <th>Дата</th>
              <th className="actions">Действия</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((elem, index) => (
              <tr key={index}>
                <td>{elem.description}</td>
                <td>{elem.sum} ₽</td>
                <td>{elem.category}</td>
                <td>{elem.date}</td>
                <td className="actions">
                  <button
                    className="delete-button"
                    onClick={() => deleteExpense(elem.id)}
                  >
                    <img src="Icon.png" alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">Итого: {totalSum} ₽</div>
      </div>
    </div>
  );
});

export default Main;
