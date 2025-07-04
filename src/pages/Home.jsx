// Importa hooks do React e componentes do projeto
import React, { useEffect, useState, useContext, useCallback } from "react";
import Header from "../components/Header/header";
import Form from "../components/Form/form";
import Grid from "../components/Grid/grid";
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';

// Importa funções do Firestore para manipulação de dados em tempo real
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  deleteDoc,
  addDoc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

import Menu from "../components/Menu/menu";

// Função para formatar valores numéricos como moeda brasileira (R$)
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Função pura que ordena transações por data (mais recentes primeiro)
const sortTransactionsByDate = (transactions) => {
  return [...transactions].sort((a, b) => {
    const dateA = a.data instanceof Date ? a.data : new Date(a.data);
    const dateB = b.data instanceof Date ? b.data : new Date(b.data);

    if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
    if (isNaN(dateA.getTime())) return 1;
    if (isNaN(dateB.getTime())) return -1;

    return dateB - dateA; // mais recentes primeiro
  });
};

// Componente principal da página inicial
export default function Home() {
  const { currentUser } = useContext(AuthContext); // obtém usuário autenticado
  const [rawTransactions, setRawTransactions] = useState([]); // dados brutos
  const [transactionsList, setTransactionsList] = useState([]); // dados ordenados
  const [income, setIncome] = useState(formatCurrency(0));
  const [expense, setExpense] = useState(formatCurrency(0));
  const [total, setTotal] = useState(formatCurrency(0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reordena e atualiza a lista de transações ordenadas
  const sortAndSetTransactions = useCallback(() => {
    const sorted = sortTransactionsByDate(rawTransactions);
    setTransactionsList(sorted);
  }, [rawTransactions]);

  // Carrega as transações do Firestore em tempo real
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", currentUser.uid) // filtra pelas transações do usuário logado
    );

    // onSnapshot escuta alterações em tempo real
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const transactions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const transactionDate = data.data?.toDate ? data.data.toDate() : data.data;

          transactions.push({ 
            id: doc.id,
            ...data,
            data: transactionDate,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt
          });
        });

        setRawTransactions(transactions); // atualiza estado
        setLoading(false);
      },
      (error) => {
        setError("Erro ao carregar transações: " + error.message);
        setLoading(false);
      }
    );

    // Encerra escuta ao desmontar componente
    return () => unsubscribe();
  }, [currentUser]);

  // Reordena transações sempre que a lista bruta muda
  useEffect(() => {
    sortAndSetTransactions();
  }, [rawTransactions, sortAndSetTransactions]);

  // Calcula os totais de entradas, saídas e saldo
  useEffect(() => {
    if (transactionsList.length === 0) {
      setIncome(formatCurrency(0));
      setExpense(formatCurrency(0));
      setTotal(formatCurrency(0));
      return;
    }

    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter((item) => !item.expense)
      .map((transaction) => Number(transaction.amount));

    const totalExpense = amountExpense.reduce((acc, cur) => acc + cur, 0);
    const totalIncome = amountIncome.reduce((acc, cur) => acc + cur, 0);
    const balance = totalIncome - totalExpense;

    setIncome(formatCurrency(totalIncome));
    setExpense(formatCurrency(totalExpense));
    setTotal(`${balance < 0 ? "-" : ""}${formatCurrency(Math.abs(balance))}`);
  }, [transactionsList]);

  // Adiciona nova transação no Firestore
  const handleAdd = async (transaction) => {
    if (!currentUser) return;

    try {
      const { id, ...cleanTransaction } = transaction;

      await addDoc(collection(db, "transactions"), {
        ...cleanTransaction,
        userId: currentUser.uid,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Erro ao adicionar transação: ", error);
      setError("Erro ao adicionar: " + error.message);
    }
  };

  // Exclui transação pelo ID
  const handleDelete = async (id) => {
    try {
      const idString = String(id).trim();

      if (!idString) {
        console.error("ID inválido para exclusão: vazio");
        return;
      }

      await deleteDoc(doc(db, "transactions", idString));
    } catch (error) {
      console.error("Erro ao excluir transação: ", error);
      setError(`Erro ao excluir: ${error.message}`);
    }
  };

  // Atualiza transação existente no Firestore
  const handleEdit = async (updatedItem) => {
    if (!currentUser) return;

    try {
      const idString = String(updatedItem.id).trim();
      const { id, ...updateData } = updatedItem;

      await updateDoc(doc(db, "transactions", idString), {
        ...updateData,
        userId: currentUser.uid
      });
    } catch (error) {
      console.error("Erro ao atualizar transação: ", error);
      setError("Erro ao atualizar: " + error.message);
    }
  };

  // Mostra tela de carregamento enquanto busca os dados
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Renderização principal da página
  return (
    <div className="flex flex-col min-h-screen">
      {/* Alerta de erro no topo da tela */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
            <button 
              className="absolute top-0 right-0 px-4 py-3"
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="flex-grow">
        <Header income={income} expense={expense} total={total} />

        <div className="mt-24 mb-8 px-4 flex flex-col items-center justify-start">
          <Form handleAdd={handleAdd} />

          {/* Condicional: lista ou mensagem vazia */}
          {transactionsList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nenhuma transação cadastrada ainda
              </p>
              <p className="text-gray-400 mt-2">
                Adicione sua primeira transação usando o formulário acima
              </p>
            </div>
          ) : (
            <Grid 
              itens={transactionsList} 
              onDelete={handleDelete} 
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
      <Menu />
    </div>
  );
}
