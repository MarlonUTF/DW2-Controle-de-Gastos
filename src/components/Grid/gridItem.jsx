import React, { useState, useEffect } from "react";
import { 
  FaRegArrowAltCircleUp, 
  FaRegArrowAltCircleDown, 
  FaTrash, 
  FaEdit, 
  FaSave, 
  FaTimes 
} from "react-icons/fa"; // Ícones para botões e status
import { format, parseISO, isValid } from 'date-fns'; // Utilitários para data
import { ptBR } from 'date-fns/locale'; // Locale português brasileiro
import InputLabel from '@mui/material/InputLabel'; // Componentes MUI para select
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AlertComponent from "../Utilitarios/alert"; // Componente customizado para alertas

export default function GridItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar modo edição
  const [editedItem, setEditedItem] = useState({ ...item }); // Estado para dados editáveis
  
  // Estados para controle de alertas (mensagens)
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  // Atualiza o estado editável sempre que o prop `item` mudar
  useEffect(() => {
    setEditedItem({ ...item });
  }, [item]);

  // Função para formatar a data exibida na tabela
  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return 'Sem data'; // Caso valor vazio ou nulo
      
      let date = dateValue;
      if (typeof dateValue === 'string') { // Converte string ISO para Date
        date = parseISO(dateValue);
      }
      
      // Se data válida, formata para dd/MM/yyyy, caso contrário mostra erro
      return isValid(date) ? 
        format(date, 'dd/MM/yyyy', { locale: ptBR }) : 
        'Data inválida';
    } catch (e) {
      console.error("Erro ao formatar data:", e);
      return 'Erro';
    }
  };

  // Converte a data para formato padrão de input do tipo date (yyyy-MM-dd)
  const toDateInputValue = (dateValue) => {
    try {
      if (!dateValue) return '';
      
      let date = dateValue;
      if (typeof dateValue === 'string') {
        date = parseISO(dateValue);
      }
      
      return isValid(date) ? 
        format(date, 'yyyy-MM-dd') : 
        '';
    } catch (e) {
      console.error("Erro ao converter data para input:", e);
      return '';
    }
  };

  // Atualiza os dados editados conforme o usuário digita ou seleciona
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  // Quando a categoria é alterada, atualiza a categoria e reseta subcategoria se não for alimentação
  const handleCategoriaChange = (event) => {
    const value = event.target.value;
    setEditedItem(prev => ({ 
      ...prev, 
      categoria: value,
      ...(value !== 'alimentacao' && { subCategoria: '' }) // Limpa subcategoria se não for alimentação
    }));
  };

  // Atualiza subcategoria selecionada
  const handleSubCategoriaChange = (event) => {
    setEditedItem(prev => ({ 
      ...prev, 
      subCategoria: event.target.value 
    }));
  };

  // Salva as alterações após validação dos campos
  const handleSave = () => {
    // Validações com alertas
    if (!editedItem.desc?.trim()) {
      setAlertMessage("Informe a descrição!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    
    if (!editedItem.amount || Number(editedItem.amount) <= 0) {
      setAlertMessage("Informe um valor válido!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    
    if (!editedItem.categoria) {
      setAlertMessage("Selecione uma categoria!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }
    
    if (editedItem.expense && editedItem.categoria === 'alimentacao' && !editedItem.subCategoria) {
      setAlertMessage("Selecione uma subcategoria!");
      setAlertSeverity("warning");
      setAlertOpen(true);
      return;
    }

    // Prepara objeto final para salvar convertendo os tipos
    const finalItem = {
      ...editedItem,
      amount: parseFloat(editedItem.amount),
      data: typeof editedItem.data === 'string' ? 
        new Date(editedItem.data) : 
        editedItem.data
    };
    
    onEdit(finalItem);    // Chama callback para atualizar
    setIsEditing(false);  // Sai do modo edição

    // Alerta de sucesso
    setAlertMessage("Transação atualizada com sucesso!");
    setAlertSeverity("success");
    setAlertOpen(true);
  };

  // Cancela a edição, voltando ao estado original
  const handleCancel = () => {
    setEditedItem(item);
    setIsEditing(false);
  };

  return (
    <>
      {/* Componente de alerta fixo no topo */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <AlertComponent
          open={alertOpen}
          setOpen={setAlertOpen}
          message={alertMessage}
          severity={alertSeverity}
        />
      </div>

      {/* Linha da tabela com os dados da transação */}
      <tr className="border-b hover:bg-gray-50">
        {/* Coluna de descrição */}
        <td className="px-4 py-3 text-sm">
          {isEditing ? (
            <input
              type="text"
              name="desc"
              value={editedItem.desc}
              onChange={handleEditChange}
              className="w-full p-2 border rounded"
            />
          ) : item.desc}
        </td>
      
        {/* Coluna de valor */}
        <td className={`px-4 py-3 text-sm font-medium ${item.expense ? 'text-red-600' : 'text-green-600'}`}>
          {isEditing ? (
            <input
              type="number"
              name="amount"
              value={editedItem.amount}
              onChange={handleEditChange}
              step="0.01"
              min="0"
              className="w-full p-2 border rounded"
            />
          ) : (
            <div className="flex items-center">
              {item.expense ? (
                <FaRegArrowAltCircleDown className="text-red-500 mr-2" />
              ) : (
                <FaRegArrowAltCircleUp className="text-green-500 mr-2" />
              )}
              {item.expense ? '- ' : '+ '}R$ {parseFloat(item.amount).toFixed(2)}
            </div>
          )}
        </td>

        {/* Coluna de data */}
        <td className="px-4 py-3 text-sm">
          {isEditing ? (
            <input
              type="date"
              name="data"
              value={toDateInputValue(editedItem.data)}
              onChange={handleEditChange}
              className="p-2 border rounded"
            />
          ) : formatDate(item.data)}
        </td>

        {/* Coluna de categoria */}
        <td className="px-4 py-3 text-sm">
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex gap-4">
                {/* Select para categoria principal */}
                <FormControl fullWidth size="small">
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={editedItem.categoria}
                    onChange={handleCategoriaChange}
                    label="Categoria"
                  >
                    <MenuItem value="alimentacao">Alimentação</MenuItem>
                    <MenuItem value="fixo">Fixo</MenuItem>
                    <MenuItem value="transporte">Transporte</MenuItem>
                    <MenuItem value="saude">Saúde</MenuItem>
                    <MenuItem value="lazer">Lazer</MenuItem>
                    <MenuItem value="educacao">Educação</MenuItem>
                    <MenuItem value="investimento">Investimento</MenuItem>
                    <MenuItem value="pessoal">Pessoal</MenuItem>
                    <MenuItem value="divida">Dívida / Empréstimo</MenuItem>
                  </Select>
                </FormControl>

                {/* Select para subcategoria, aparece só se categoria for alimentação */}
                {editedItem.categoria === 'alimentacao' && (
                  <FormControl fullWidth size="small">
                    <InputLabel>Sub Categoria</InputLabel>
                    <Select
                      value={editedItem.subCategoria || ''}
                      onChange={handleSubCategoriaChange}
                      label="Sub Categoria"
                    >
                      <MenuItem value="cantina">Cantina</MenuItem>
                      <MenuItem value="mercado">Compras de Mercado</MenuItem>
                      <MenuItem value="restaurante">Restaurantes e Lanchonetes</MenuItem>
                      <MenuItem value="fastFood">Fast Food / Delivery</MenuItem>
                      <MenuItem value="doces">Doces e Sobremesas</MenuItem>
                      <MenuItem value="feira">Feira</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
          ) : (
            <div>
              {/* Exibe categoria em texto amigável */}
              {item.categoria === 'alimentacao' ? 'Alimentação' :
               item.categoria === 'fixo' ? 'Fixo' :
               item.categoria === 'transporte' ? 'Transporte' :
               item.categoria === 'saude' ? 'Saúde' :
               item.categoria === 'lazer' ? 'Lazer' :
               item.categoria === 'educacao' ? 'Educação' :
               item.categoria === 'investimento' ? 'Investimento' :
               item.categoria === 'pessoal' ? 'Pessoal' :
               item.categoria === 'divida' ? 'Dívida / Empréstimo' : item.categoria}
      
              {/* Exibe subcategoria se existir */}
              {item.subCategoria && (
                <div className="text-xs text-gray-500">
                  {item.subCategoria === 'cantina' ? 'Cantina' :
                   item.subCategoria === 'mercado' ? 'Compras de Mercado' :
                   item.subCategoria === 'restaurante' ? 'Restaurantes e Lanchonetes' :
                   item.subCategoria === 'fastFood' ? 'Fast Food / Delivery' :
                   item.subCategoria === 'doces' ? 'Doces e Sobremesas' :
                   item.subCategoria === 'feira' ? 'Feira' : item.subCategoria}
                </div>
              )}
            </div>
          )}
        </td>

        {/* Coluna de ações: editar, salvar, cancelar, excluir */}
        <td className="px-4 py-3 text-center">
          <div className="flex justify-center space-x-2">
            {isEditing ? (
              <>
                {/* Botão salvar */}
                <button
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-800 p-2"
                  aria-label="Salvar"
                >
                  <FaSave />
                </button>
                {/* Botão cancelar */}
                <button
                  onClick={handleCancel}
                  className="text-gray-600 hover:text-gray-800 p-2"
                  aria-label="Cancelar"
                >
                  <FaTimes />
                </button>
              </>
            ) : (
              <>
                {/* Botão editar */}
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-600 hover:text-blue-800 p-2"
                  aria-label="Editar"
                >
                  <FaEdit />
                </button>
                {/* Botão excluir */}
                <button
                  onClick={() => {
                    if (item.id) {
                      onDelete(item.id);
                    }
                  }}
                  className="text-red-600 hover:text-red-800 p-2"
                  aria-label="Excluir"
                >
                  <FaTrash />
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}
