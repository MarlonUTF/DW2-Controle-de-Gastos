import GridItem from './gridItem';

export default function Grid({ itens, setItens }) {
  const onDelete = (ID) => {
    const newArray = itens.filter((transaction) => transaction.id !== ID);
    setItens(newArray);
    localStorage.setItem("transactions", JSON.stringify(newArray));
  };

  if(itens.length==0){
    return(
      <div className='w-[98%] max-w-[1120px] mx-auto mt-7 flex justify-center items-center col-span-4 text-gray-600 p-4 border border-gray-600 rounded-2xl'>Nenhuma transação registrada</div>
    )
  }

  return (
    <div className='w-[98%] max-w-[1120px] mx-auto mt-7'>
      <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg overflow-hidden mt-4">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="w-2/5 py-2 px-4 text-left">Descrição</th>
            <th className="w-2/5 py-2 px-4 text-left">Valor</th>
            <th className="w-2/5 py-2 px-4 text-left">Data</th>
            <th className="w-2/5 py-2 px-4 text-left">Categoria</th>
            <th className="w-1/10 py-2 px-4 text-center">Tipo</th>
            <th className="w-1/10 py-2 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {itens?.map((item, index) => (
            <GridItem key={index} item={item} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

