import React from "react";
import GridItem from "./GridItem";

export default function Grid({ itens, onDelete, onEdit }) {
  return (
    <div className="w-full max-w-[1120px] mt-8 overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Descrição</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Valor</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Categoria</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.length > 0 ? (
            itens.map((item) => {
              // Verificação crucial: garantir que o item tenha ID
              if (!item.id) {
                console.warn("Item sem ID:", item);
                return null;
              }
              
              // Garantir que o ID seja string
              const safeItem = {
                ...item,
                id: String(item.id).trim()
              };
              
              return (
                <GridItem 
                  key={safeItem.id} 
                  item={safeItem} 
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                Nenhuma transação encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}