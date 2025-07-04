import { useState, useEffect } from "react";
import AlertComponent from "../Utilitarios/alert";
import CategoriaDespesa from "./categoriaDespesa";
import CategoriaEntrada from "./categoriaEntrada";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function Form({ handleAdd }) {
  // Estado para descrição da transação
  const [desc, setDesc] = useState("");
  // Estado para valor da transação (string para controlar input)
  const [amount, setAmount] = useState("");
  // Data atual no formato YYYY-MM-DD para input date
  const today = new Date().toISOString().split("T")[0];
  // Estado para a data da transação
  const [data, setData] = useState(today);
  // Estado booleano para tipo de transação: true = despesa, false = entrada
  const [isExpense, setExpense] = useState(true);
  
  // Estado para categoria, que guarda o valor e tipo ('despesa' ou 'entrada')
  const [categoria, setCategoria] = useState({
    value: '',
    type: 'despesa' // padrão inicial
  });
  
  // Estado para subcategoria (usada só para categoria 'alimentacao' em despesas)
  const [subCategoria, setSubCategoria] = useState('');

  // Estados para controlar o alerta (mensagem, tipo e visibilidade)
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  // Atualiza o tipo de categoria sempre que o tipo da transação muda
  useEffect(() => {
    setCategoria(prev => ({
      ...prev,
      type: isExpense ? 'despesa' : 'entrada'
    }));
  }, [isExpense]);

  // Atualiza o valor da categoria mantendo o tipo
  const handleSetCategoria = (value) => {
    setCategoria(prev => ({
      ...prev,
      value
    }));
  };

  // Gera um ID único simples usando timestamp + número aleatório
  function generateID() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  // Função chamada ao clicar no botão ADICIONAR
  function handleSave() {
    // Validações dos campos obrigatórios
    if (!desc.trim()) {
      setAlertMessage("Informe a descrição!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return; // interrompe a função se inválido
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
    
    // Se for despesa e categoria alimentação, subcategoria é obrigatória
    if (isExpense && categoria.value === 'alimentacao' && !subCategoria) {
      setAlertMessage("Selecione uma Sub Categoria!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }

    // Monta o objeto transação para enviar ao componente pai
    const transaction = {
      id: generateID(),
      desc: desc,
      amount: Number(amount),   // converte valor para número
      data: data,               // mantém data como string no formato yyyy-mm-dd
      expense: isExpense,       // true para despesa, false para entrada
      categoria: categoria.value,
      // Subcategoria definida só para alimentação em despesas, senão null
      subCategoria: (isExpense && categoria.value === 'alimentacao') ? subCategoria : null
    };

    // Chama função passada via props para adicionar a transação
    handleAdd(transaction);

    // Reseta os estados do formulário para valores iniciais
    setDesc("");
    setAmount("");
    setData(today);
    setExpense(true);
    setCategoria({ value: '', type: 'despesa' });
    setSubCategoria('');

    // Exibe alerta de sucesso
    setAlertMessage("Transação adicionada com sucesso!");
    setAlertSeverity("success");
    setAlertOpen(true);
  }

  return (
    <>
      {/* Componente de alerta que mostra mensagens ao usuário */}
      <div className="max-w-[1120px] w-[98%] mx-auto mt-18">
        <AlertComponent
          open={alertOpen}
          setOpen={setAlertOpen}
          message={alertMessage}
          severity={alertSeverity}
        />
      </div>

      {/* Container do formulário */}
      <div className="max-w-[1120px] w-[98%] mx-auto mt-6 bg-white shadow-md rounded-md p-4 border border-gray-200">
        
        {/* Inputs para descrição, valor e data, organizados em grid */}
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

        {/* Seletor do tipo de transação (entrada ou saída) */}
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

          {/* Renderiza seletor de categoria conforme tipo selecionado */}
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

          {/* Botão para adicionar nova transação */}
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
