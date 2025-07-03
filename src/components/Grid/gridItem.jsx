import React, { useState, useEffect } from "react";
import { 
  FaRegArrowAltCircleUp, 
  FaRegArrowAltCircleDown, 
  FaTrash, 
  FaEdit, 
  FaSave, 
  FaTimes 
} from "react-icons/fa";
import { format, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function GridItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  // Atualizar editedItem quando o item prop mudar
  useEffect(() => {
    setEditedItem({ ...item });
  }, [item]);

  // Função para converter data para formato legível
  const formatDate = (dateValue) => {
    try {
      if (!dateValue) return 'Sem data';
      
      // Converter para Date se necessário
      let date = dateValue;
      if (typeof dateValue === 'string') {
        date = parseISO(dateValue);
      }
      
      // Verificar se é uma data válida
      return isValid(date) ? 
        format(date, 'dd/MM/yyyy', { locale: ptBR }) : 
        'Data inválida';
    } catch (e) {
      console.error("Erro ao formatar data:", e);
      return 'Erro';
    }
  };

  // Função para converter data para formato de input date (YYYY-MM-DD)
  const toDateInputValue = (dateValue) => {
    try {
      if (!dateValue) return '';
      
      // Converter para Date se necessário
      let date = dateValue;
      if (typeof dateValue === 'string') {
        date = parseISO(dateValue);
      }
      
      // Verificar se é uma data válida
      return isValid(date) ? 
        format(date, 'yyyy-MM-dd') : 
        '';
    } catch (e) {
      console.error("Erro ao converter data para input:", e);
      return '';
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSave = () => {
    // Converter dados para formatos adequados
    const finalItem = {
      ...editedItem,
      amount: parseFloat(editedItem.amount),
      // Converter string para objeto Date apenas se necessário
      data: typeof editedItem.data === 'string' ? 
        new Date(editedItem.data) : 
        editedItem.data
    };
    
    onEdit(finalItem);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedItem(item);
    setIsEditing(false);
  };

  return (
    <tr className="border-b hover:bg-gray-50">
      {/* Descrição */}
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
      
      {/* Valor */}
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

      {/* Data */}
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

      {/* Categoria */}
      <td className="px-4 py-3 text-sm">
        {isEditing ? (
          <div>
            <select
              name="categoria"
              value={editedItem.categoria}
              onChange={handleEditChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Transporte">Transporte</option>
              <option value="Moradia">Moradia</option>
              <option value="Lazer">Lazer</option>
              <option value="Saúde">Saúde</option>
              <option value="Educação">Educação</option>
              <option value="Outros">Outros</option>
            </select>
            <input
              type="text"
              name="subCategoria"
              value={editedItem.subCategoria || ''}
              onChange={handleEditChange}
              placeholder="Subcategoria"
              className="w-full p-2 border rounded"
            />
          </div>
        ) : (
          <div>
            {item.categoria}
            {item.subCategoria && <div className="text-xs text-gray-500">{item.subCategoria}</div>}
          </div>
        )}
      </td>

      {/* Ações */}
      <td className="px-4 py-3 text-center">
        <div className="flex justify-center space-x-2">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave} 
                className="text-green-600 hover:text-green-800 p-2"
                aria-label="Salvar"
              >
                <FaSave />
              </button>
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
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-blue-600 hover:text-blue-800 p-2"
                aria-label="Editar"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  // Verificação adicional antes de deletar
                  if (item.id) {
                    onDelete(item.id);
                  } else {
                    console.error("Tentativa de excluir item sem ID:", item);
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
  );
}