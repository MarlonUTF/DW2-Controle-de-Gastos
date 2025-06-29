import React, { useEffect, useState } from "react";
import Header from "../components/Header/header";
import Form from "../components/Form/form";
import Grid from "../components/Grid/grid";
import Menu from "../components/Menu/menu"

export default function Home() {
    const [transactionsList, setTransactionsList] = useState(() => {
        const data = localStorage.getItem("transactions");
        return data ? JSON.parse(data) : [];
    });

    const [income, setIncome] = useState("R$ 0.00");
    const [expense, setExpense] = useState("R$ 0.00");
    const [total, setTotal] = useState("R$ 0.00");

    useEffect(() => {
        localStorage.setItem("transactions", JSON.stringify(transactionsList));
    }, [transactionsList]);

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
    };

    return (
        <div className="flex h-[100%] w-[100%]">
        <div className="w-[100%] h-dvh  overflow-auto">
            <Header income={income} expense={expense} total={total}/>
            <Form
            handleAdd={handleAdd}
            transactionsList={transactionsList}
            setTransactionsList={setTransactionsList}
            />
            <Grid itens={transactionsList} setItens={setTransactionsList} />
        </div>
        {/* <Menu /> */}
        </div>
    );
}