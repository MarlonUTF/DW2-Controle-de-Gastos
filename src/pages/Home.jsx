import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header/header";
import Form from "../components/Form/form";
import Grid from "../components/Grid/grid";
import { AuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
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

// Função para formatação monetária
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const [transactionsList, setTransactionsList] = useState([]);
  const [income, setIncome] = useState(formatCurrency(0));
  const [expense, setExpense] = useState(formatCurrency(0));
  const [total, setTotal] = useState(formatCurrency(0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar transações do Firestore
  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const transactions = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Garantir conversão correta de datas
          const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt;
          const transactionDate = data.data?.toDate ? data.data.toDate() : data.data;
          
          transactions.push({ 
            id: doc.id, // ID do documento (string)
            ...data,
            data: transactionDate,
            createdAt: createdAt
          });
        });
        
        // ORDENAÇÃO ALTERADA: Agora por data da transação (mais recente primeiro)
        transactions.sort((a, b) => {
          // Se alguma data for inválida, coloca no final
          if (!(a.data instanceof Date)) return 1;
          if (!(b.data instanceof Date)) return -1;
          return b.data - a.data;
        });
        
        setTransactionsList(transactions);
        setLoading(false);
      },
      (error) => {
        setError("Erro ao carregar transações: " + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Calcular totais
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

  useEffect(() => {
    console.log("Usuário atual:", currentUser?.uid);
  }, [currentUser]);

  // Adicionar transação
  const handleAdd = async (transaction) => {
    if (!currentUser) return;

    try {
      const { id, ...cleanTransaction } = transaction;
      
      await addDoc(collection(db, "transactions"), {
        ...cleanTransaction,
        userId: currentUser.uid, // Garantir que userId está sendo enviado
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Erro ao adicionar transação: ", error);
      setError("Erro ao adicionar: " + error.message);
    }
  };

  // Excluir transação
  const handleDelete = async (id) => {
    try {
      // Garantir que ID seja string
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

  // Atualizar transação
  const handleEdit = async (updatedItem) => {
    if (!currentUser) return;

    try {
      const idString = String(updatedItem.id).trim();
      const { id, ...updateData } = updatedItem;
      
      await updateDoc(doc(db, "transactions", idString), {
        ...updateData,
        userId: currentUser.uid // Manter userId durante atualizações
      });
    } catch (error) {
      console.error("Erro ao atualizar transação: ", error);
      setError("Erro ao atualizar: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
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
      
      <div className="flex-grow">
        <Header income={income} expense={expense} total={total} />
        
        <div className="mt-24 mb-8 px-4 flex flex-col items-center">
          <Form handleAdd={handleAdd} />
          
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