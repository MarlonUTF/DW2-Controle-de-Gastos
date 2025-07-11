import React, { useState, useEffect } from "react";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import AlertComponent from "../Utilitarios/alert";

export default function GridItem({ item, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");

  useEffect(() => {
    setEditedItem({ ...item });
  }, [item]);

  const formatDate = (value) => {
    if (!value) return "Sem data";
    const date = typeof value === "string" ? parseISO(value) : value;
    return isValid(date) ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Data inválida";
  };

  const toDateInputValue = (value) => {
    if (!value) return "";
    const date = typeof value === "string" ? parseISO(value) : value;
    return isValid(date) ? format(date, "yyyy-MM-dd") : "";
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const isExpense = e.target.value === "saida";
    setEditedItem({ ...editedItem, expense: isExpense, categoria: "", subCategoria: "" });
  };

  const handleSave = () => {
    if (!editedItem.desc?.trim()) return triggerAlert("Informe a descrição!", "warning");
    if (!editedItem.amount || Number(editedItem.amount) <= 0) return triggerAlert("Informe um valor válido!", "warning");
    if (!editedItem.categoria) return triggerAlert("Selecione uma categoria!", "warning");
    if (editedItem.expense && editedItem.categoria === "alimentacao" && !editedItem.subCategoria) {
      return triggerAlert("Selecione uma subcategoria!", "warning");
    }

    const finalItem = {
      ...editedItem,
      amount: parseFloat(editedItem.amount),
      data: typeof editedItem.data === "string" ? new Date(editedItem.data) : editedItem.data,
    };

    onEdit(finalItem);
    setIsEditing(false);
    triggerAlert("Transação atualizada com sucesso!", "success");
  };

  const triggerAlert = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleCancel = () => {
    setEditedItem(item);
    setIsEditing(false);
  };

  const categorias = {
    despesa: [
      "alimentacao",
      "fixo",
      "transporte",
      "saude",
      "lazer",
      "educacao",
      "investimento",
      "pessoal",
      "divida",
    ],
    receita: ["salario", "freelance", "rendimentos", "presente", "extra", "outros"],
  };

  const subCategorias = [
    "cantina",
    "mercado",
    "restaurante",
    "fastFood",
    "doces",
    "feira",
  ];

  const getCategoriaText = (cat) => ({
    alimentacao: "Alimentação",
    fixo: "Fixo",
    transporte: "Transporte",
    saude: "Saúde",
    lazer: "Lazer",
    educacao: "Educação",
    investimento: "Investimento",
    pessoal: "Pessoal",
    divida: "Dívida / Empréstimo",
    salario: "Salário",
    freelance: "Freelance",
    rendimentos: "Rendimentos de Investimento",
    presente: "Presente / Doação",
    extra: "Renda Extra",
    outros: "Outros",
  }[cat] || cat);

  const getSubCategoriaText = (sub) => ({
    cantina: "Cantina",
    mercado: "Compras de Mercado",
    restaurante: "Restaurantes e Lanchonetes",
    fastFood: "Fast Food / Delivery",
    doces: "Doces e Sobremesas",
    feira: "Feira",
  }[sub] || sub);

  return (
    <>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <AlertComponent open={alertOpen} setOpen={setAlertOpen} message={alertMessage} severity={alertSeverity} />
      </div>

      <tr className="border-b hover:bg-gray-50">
        <td className="px-4 py-3 text-sm">
          {isEditing ? (
            <input type="text" name="desc" value={editedItem.desc} onChange={handleEditChange} className="w-full p-2 border rounded" />
          ) : (
            item.desc
          )}
        </td>

        <td className={`px-4 py-3 text-sm font-medium ${item.expense ? "text-red-600" : "text-green-600"}`}>
          {isEditing ? (
            <input type="number" name="amount" value={editedItem.amount} onChange={handleEditChange} step="0.01" min="0" className="w-full p-2 border rounded" />
          ) : (
            <div className="flex items-center">
              {item.expense ? <FaRegArrowAltCircleDown className="text-red-500 mr-2" /> : <FaRegArrowAltCircleUp className="text-green-500 mr-2" />}
              {item.expense ? "- " : "+ "}R$ {parseFloat(item.amount).toFixed(2)}
            </div>
          )}
        </td>

        <td className="px-4 py-3 text-sm">
          {isEditing ? (
            <input type="date" name="data" value={toDateInputValue(editedItem.data)} onChange={handleEditChange} className="p-2 border rounded" />
          ) : (
            formatDate(item.data)
          )}
        </td>

        <td className="px-4 py-3 text-sm">
          {isEditing ? (
            <div className="space-y-3">
              <FormControl component="fieldset">
                <RadioGroup row value={editedItem.expense ? "saida" : "entrada"} onChange={handleTypeChange}>
                  <FormControlLabel value="saida" control={<Radio size="small" />} label="Saída" />
                  <FormControlLabel value="entrada" control={<Radio size="small" />} label="Entrada" />
                </RadioGroup>
              </FormControl>

              <div className="flex gap-4">
                <FormControl fullWidth size="small">
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    name="categoria"
                    value={editedItem.categoria || ""}
                    onChange={handleEditChange}
                    label="Categoria"
                  >
                    {(editedItem.expense ? categorias.despesa : categorias.receita).map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {getCategoriaText(cat)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {editedItem.expense && editedItem.categoria === "alimentacao" && (
                  <FormControl fullWidth size="small">
                    <InputLabel>Sub Categoria</InputLabel>
                    <Select
                      name="subCategoria"
                      value={editedItem.subCategoria || ""}
                      onChange={handleEditChange}
                      label="Sub Categoria"
                    >
                      {subCategorias.map((sub) => (
                        <MenuItem key={sub} value={sub}>
                          {getSubCategoriaText(sub)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </div>
            </div>
          ) : (
            <div>
              <span className="font-medium">{getCategoriaText(item.categoria)}</span>
              {item.subCategoria && <div className="text-xs text-gray-500 mt-1">{getSubCategoriaText(item.subCategoria)}</div>}
            </div>
          )}
        </td>

        <td className="px-4 py-3 text-center">
          <div className="flex justify-center space-x-2">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="text-green-600 hover:text-green-800 p-2" aria-label="Salvar">
                  <FaSave />
                </button>
                <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800 p-2" aria-label="Cancelar">
                  <FaTimes />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)} className="text-blue-600 hover:text-blue-800 p-2" aria-label="Editar">
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800 p-2" aria-label="Excluir">
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
 