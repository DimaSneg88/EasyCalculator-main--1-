import { useState } from "react";
import Sorting from "./Sorting";
import { arrCategory } from "../constants/category";
import type { IExpense } from "../type/expense";

type TMainProps = {
  expenses: IExpense[];
  setExpenses: (newExpenses: IExpense[]) => void;
};

function parseDate(dateString: string) {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day).getTime();
}

export default function Main({ expenses, setExpenses }: TMainProps) {
  const [sortDate, setSortDate] = useState("date-desc");
  const [sortSum, setSortSum] = useState("sum-desc");
  const [filterCategory, setFilterCategory] = useState("Все категории");

  const deleteExpense = (id: number) => {
    setExpenses([...expenses].filter((expense) => expense.id !== id));
  };
  console.log(...expenses);

  const filters =
    filterCategory === "Все категории"
      ? expenses
      : expenses.filter((elem) => elem.category === filterCategory);

  const sortedExpenses = [...filters].sort((a, b) => {
    if (sortSum === "sum-asc") return a.sum - b.sum;
    if (sortSum === "sum-desc") return b.sum - a.sum;

    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);

    return sortDate === "date-asc" ? dateA - dateB : dateB - dateA;
  });

  const totalSum = filters.reduce((a, b) => a + b.sum, 0);

  return (
    <div>
      <div className="section">
        <div className="head-section">
          <h2>Список затрат</h2>
          <div>
            <Sorting
              setSort={setSortSum}
              sortDate={setSortDate}
              arrCategory={arrCategory}
              setFilterCategory={setFilterCategory}
              filterCategory={filterCategory}
            />
          </div>
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
}
