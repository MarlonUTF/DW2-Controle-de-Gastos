import React, { useEffect, useState } from "react";
import Header from "./components/Header/header";
import Form from "./components/Form/form";

const App = () => {
  const data = localStorage.getItem("transactions");
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data) : []
  );

  const [income, setIncome] = useState("R$ 0.00");
  const [expense, setExpense] = useState("R$ 0.00");
  const [total, setTotal] = useState("R$ 0.00");

  useEffect(() => {
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const totalExpense = amountExpense.reduce((acc, cur) => acc + cur, 0);
    const totalIncome = amountIncome.reduce((acc, cur) => acc + cur, 0);
    const balance = totalIncome - totalExpense;

    setIncome(`R$ ${totalIncome.toFixed(2)}`);
    setExpense(`R$ ${totalExpense.toFixed(2)}`);
    setTotal(`${balance < 0 ? "-" : ""}R$ ${Math.abs(balance).toFixed(2)}`);
  }, [transactionsList]);

  const handleAdd = (transaction) => {
    const newArray = [...transactionsList, transaction];
    setTransactionsList(newArray);
    localStorage.setItem("transactions", JSON.stringify(newArray));
  };

  return (
    <>
      <Header income={income} expense={expense} total={total}/>
      <Form
        handleAdd={handleAdd}
        transactionsList={transactionsList}
        setTransactionsList={setTransactionsList}
      />
    </>
  );
};

export default App;
