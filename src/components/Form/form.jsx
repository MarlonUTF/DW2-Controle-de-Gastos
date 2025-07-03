import { useState, useEffect } from "react";
import AlertComponent from "../Utilitarios/alert";
import CategoriaDespesa from "./categoriaDespesa";
import CategoriaEntrada from "./categoriaEntrada";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function Form({ handleAdd }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [data, setData] = useState(today);
  const [isExpense, setExpense] = useState(true);
  
  // Estado único para categoria com controle de tipo
  const [categoria, setCategoria] = useState({
    value: '',
    type: 'despesa' // ou 'entrada'
  });
  
  const [subCategoria, setSubCategoria] = useState('');

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  // Atualiza o tipo de categoria quando muda o tipo de transação
  useEffect(() => {
    setCategoria(prev => ({
      ...prev,
      type: isExpense ? 'despesa' : 'entrada'
    }));
  }, [isExpense]);

  const handleSetCategoria = (value) => {
    setCategoria(prev => ({
      ...prev,
      value
    }));
  };

  function generateID() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  function handleSave() {
    // Validações
    if (!desc.trim()) {
      setAlertMessage("Informe a descrição!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    
    if (!amount || Number(amount) <= 0) {
      setAlertMessage("Informe um valor válido!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    
    if (!categoria.value) {
      setAlertMessage("Selecione uma categoria!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    
    if (isExpense && categoria.value === 'alimentacao' && !subCategoria) {
      setAlertMessage("Selecione uma Sub Categoria!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }

    // Criar transação
    const transaction = {
      id: generateID(),
      desc: desc,
      amount: Number(amount),
      data: data,
      expense: isExpense,
      categoria: categoria.value,
      subCategoria: (isExpense && categoria.value === 'alimentacao') ? subCategoria : null
    };

    handleAdd(transaction);

    // Resetar formulário
    setDesc("");
    setAmount("");
    setData(today);
    setExpense(true);
    setCategoria({ value: '', type: 'despesa' });
    setSubCategoria('');

    setAlertMessage("Transação adicionada com sucesso!");
    setAlertSeverity("success");
    setAlertOpen(true);
  }

  return (
    <>
      <div className="max-w-[1120px] w-[98%] mx-auto mt-18">
        <AlertComponent
          open={alertOpen}
          setOpen={setAlertOpen}
          message={alertMessage}
          severity={alertSeverity}
        />
      </div>

      <div className="max-w-[1120px] w-[98%] mx-auto mt-6 bg-white shadow-md rounded-md p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Descrição</label>
            <input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Ex: Salário, Conta de luz..."
              className="h-13 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Valor</label>
            <input
              value={amount}
              type="number"
              min="0.01"
              step="0.01"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ex: 100.00"
              className="h-13 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Data</label>
            <input
              value={data}
              type="date"
              onChange={(e) => setData(e.target.value)}
              className="h-13 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col flex-grow min-w-[250px]">
            <label className="text-sm font-medium mb-1 block">Tipo de Transação</label>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="tipo-label"
                name="tipo"
                value={isExpense ? "saida" : "entrada"}
                onChange={(e) => setExpense(e.target.value === "saida")}
                sx={{ gap: 2 }}
              >
                <FormControlLabel 
                  value="saida" 
                  control={<Radio size="small" />} 
                  label="Saída" 
                  className="mr-4"
                />
                <FormControlLabel 
                  value="entrada" 
                  control={<Radio size="small" />} 
                  label="Entrada" 
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="flex-grow-[2] min-w-[300px]">
            {isExpense ? 
              <CategoriaDespesa 
                setCategoria={handleSetCategoria} 
                setSubCategoria={setSubCategoria}
                categoria={categoria.type === 'despesa' ? categoria.value : ''}
                subCategoria={subCategoria}
              /> 
              : 
              <CategoriaEntrada 
                setCategoria={handleSetCategoria} 
                categoria={categoria.type === 'entrada' ? categoria.value : ''}
              />
            }
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleSave}
              className="h-12 px-6 text-sm font-medium bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors w-full"
            >
              ADICIONAR
            </button>
          </div>
        </div>
      </div>      
    </>
  );
}