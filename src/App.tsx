import { useEffect, useState } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import type { IExpense } from "./type/expense";

const LOCAL_STORAGE_KEY = "expenses";

const App = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  console.log(expenses);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense: Omit<IExpense, "id">) => {
    setExpenses((prev) => [
      ...prev,
      {
        ...newExpense,
        id: Date.now(),
      },
    ]);
  };

  return (
    <>
      <Header addExpense={addExpense} />
      <Main expenses={expenses} setExpenses={setExpenses} />
    </>
  );
};

export default App;
