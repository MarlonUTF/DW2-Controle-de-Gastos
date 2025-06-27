
import Pergunta from './Pergunta/pergunta';
import Resposta from './Resposta/resposta';

export default function IA() {
  return (
    <div className="w-full h-10/12 bg-purple-200 flex justify-center items-center">
      <div className=" w-[90%] h-[98%] border-2 border-purple-700 rounded-b-2xl">
        <Resposta />
        <Pergunta />
      </div>
    </div>
  )
}