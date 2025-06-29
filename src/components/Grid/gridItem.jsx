import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
} from "react-icons/fa";

export default function GridItem({ item, onDelete }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-100">
      <td className="py-2 px-4 text-sm text-gray-800">{item.desc}</td>
      
      <td className="py-2 px-4 text-sm text-gray-800">
        R$ {parseFloat(item.amount).toFixed(2)}
      </td>

      <td className="py-2 px-4 text-sm text-gray-800">{item.data}</td>

      <td className="py-2 px-4 text-sm text-gray-800">{item.categoria}/{item.subCategoria}</td>

      <td className="py-2 px-4 text-center">
        {item.expense ? (
          <FaRegArrowAltCircleDown className="text-red-500 inline-block" />
        ) : (
          <FaRegArrowAltCircleUp className="text-green-500 inline-block" />
        )}
      </td>

      <td className="py-2 px-4 text-center">
        <button
          onClick={() => onDelete(item.id)}
          className="text-red-600 hover:text-red-800"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
