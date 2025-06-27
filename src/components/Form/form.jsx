import { useState } from "react";
import AlertComponent from "../Utilitarios/alert";

export default function Form({ handleAdd, transactionsList, setTransactionsList }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [data, setData] = useState("");
  const [isExpense, setExpense] = useState(false);

  // Estado para controlar o alerta
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  function generateID() {
    return Math.round(Math.random() * 1000);
  }

  function handleSave() {
    if (!desc || !amount ) {
      setAlertMessage("Informe a descrição!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    else if (!amount) {
      setAlertMessage("Informe o valor!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    else if (!data) {
      setAlertMessage("Informe a data!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    else if (amount < 0 ) {
      setAlertMessage("O valor tem que ser positivo!");
      setAlertSeverity("error");
      setAlertOpen(true);
      return;
    }

    const transaction = {
      id: generateID(),
      desc: desc,
      amount: Number(amount),
      data: data,
      expense: isExpense,
    };

    handleAdd(transaction);

    setDesc("");
    setAmount("");
    setData("");
    setExpense(false);

    setAlertMessage("Transação adicionada com sucesso!");
    setAlertSeverity("success");
    setAlertOpen(true);
  }

  return (
    <>
      {/* Alerta com Material UI */}
      <div className="max-w-[1120px] w-[98%] mx-auto mt-18">
        <AlertComponent
          open={alertOpen}
          setOpen={setAlertOpen}
          message={alertMessage}
          severity={alertSeverity}
        />
      </div>

      {/* Formulário */}
      <div className="max-w-[1120px] w-[98%] mx-auto mt-6 bg-white shadow-md rounded-md p-4 flex flex-wrap items-center justify-center gap-4 border border-gray-200">
        {/* Descrição */}
        <div className="flex flex-col w-full sm:w-[30%]">
          <label className="text-sm font-medium mb-1">Descrição</label>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Ex: Salário, Conta de luz..."
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        {/* Valor */}
        <div className="flex flex-col w-full sm:w-[20%]">
          <label className="text-sm font-medium mb-1">Valor</label>
          <input
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ex: 100"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        {/* Data */}
        <div className="flex flex-col w-full sm:w-[20%]">
          <label className="text-sm font-medium mb-1">Data</label>
          <input
            value={data}
            type="date"
            onChange={(e) => setData(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
        </div>

        {/* Tipo de transação */}
        <div className="flex gap-4 w-full sm:w-auto justify-center items-center">
          <div className="flex items-center gap-1">
            <input
              type="radio"
              id="rIncome"
              checked={!isExpense}
              name="group1"
              onChange={() => setExpense(false)}
              className="accent-teal-600"
            />
            <label htmlFor="rIncome" className="text-sm">Entrada</label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="radio"
              id="rExpenses"
              checked={isExpense}
              name="group1"
              onChange={() => setExpense(true)}
              className="accent-teal-600"
            />
            <label htmlFor="rExpenses" className="text-sm">Saída</label>
          </div>
        </div>

        {/* Botão Adicionar */}
        <button
          onClick={handleSave}
          className="h-[42px] px-4 text-sm font-medium bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors w-full sm:w-auto"
        >
          ADICIONAR
        </button>
      </div>      
    </>
  );
}
