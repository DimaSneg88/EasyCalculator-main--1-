import { useState } from "react";
import type { IExpense } from "../type/expense";
import { arrCategory } from "../constants/category";

type Props = {
  addExpense: (expense: Omit<IExpense, "id">) => void;
};

const Header: React.FC<Props> = ({ addExpense }) => {
  const [description, setDescription] = useState("");
  const [sum, setSum] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);
  const [sumError, setSumError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [dateError, setDateError] = useState(false);

  /* обработка клика **/
  function handleClickButton() {
    console.log("click", description, sum, category, date);
    if (description === "") {
      setError(true);
    } else {
      setError(false);
    }
    if (sum === 0) {
      setSumError(true);
    } else {
      setSumError(false);
    }
    if (category === "") {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
    if (date === "") {
      setDateError(true);
    } else {
      setDateError(false);
    }

    if (
      description.length > 0 &&
      sum > 0 &&
      category.length > 0 &&
      date.length > 0
    ) {
      addExpense({ description, sum, category, date });
    }

    setDescription("");
    setSum(0);
    setCategory("");
    setDate("");
  }
  return (
    <div>
      <h1>Калькулятор затрат</h1>

      <div className="section">
        <h2>Добавить новую затрату</h2>
        <div className="form-group">
          <div>
            <label form="description">Описание</label>
            <input
              onChange={(e) => {
                setDescription(e.target.value);
                setError(false);
              }}
              type="text"
              value={description}
            />
            {error === true && (
              <p className="error">Это поле обязательно для заполнения</p>
            )}
          </div>
          <div>
            <label form="amount">Сумма (₽)</label>
            <input
              onChange={(e) => {
                setSum(Number(e.target.value));
                console.log(category);

                setSumError(false);
              }}
              type="number"
              value={sum || ""}
            />
            {sumError === true && <p className="error">Некорректная сумма</p>}
          </div>
        </div>
        <div className="form-group">
          <div>
            <label form="category">Категория</label>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
                setCategoryError(false);
              }}
              id="category"
              value={category}
            >
              {/* TODO Вывести категории из контсанты */}
              <option value="">Выберите категорию</option>
              {arrCategory.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
            {categoryError === true && (
              <p className="error">Выберите категорию</p>
            )}
          </div>
          <div>
            <label form="date">Дата</label>
            <input
              onChange={(e) => {
                setDate(e.target.value);
                setDateError(false);
              }}
              type="date"
              value={date}
            />
            {dateError === true && <p className="error">Укажите дату</p>}
          </div>
        </div>
        <button className="add-button" onClick={handleClickButton}>
          Добавить затрату
        </button>
      </div>
    </div>
  );
};
export default Header;
