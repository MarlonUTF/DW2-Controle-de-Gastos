import React from "react";
import GridItem from "./GridItem"; // Importa o componente que renderiza cada linha da tabela

export default function Grid({ itens, onDelete, onEdit }) {
  return (
    // Container principal da tabela com estilos para largura máxima, borda e overflow horizontal
    <div className="w-full max-w-[1120px] mt-8 overflow-x-auto rounded-lg border border-gray-200 overflow-hidden">
      
      {/* Tabela HTML com espaçamento e estilo */}
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-gray-100">
          <tr>
            {/* Cabeçalhos das colunas */}
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-tl-lg">Descrição</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Valor</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Data</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Categoria</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 rounded-tr-lg">Ações</th>
          </tr>
        </thead>

        <tbody>
          {itens.length > 0 ? (
            // Se houver itens, mapeia para renderizar uma linha para cada transação
            itens.map((item) => {
              // Verifica se o item tem id, senão loga e não renderiza
              if (!item.id) {
                console.warn("Item sem ID:", item);
                return null;
              }
              
              // Garante que o id é string e sem espaços nas bordas
              const safeItem = {
                ...item,
                id: String(item.id).trim()
              };
              
              return (
                // Renderiza o GridItem para cada item, passando callbacks para editar e deletar
                <GridItem 
                  key={safeItem.id} 
                  item={safeItem} 
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              );
            })
          ) : (
            // Caso não haja itens, exibe uma linha indicando que não foi encontrada nenhuma transação
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
