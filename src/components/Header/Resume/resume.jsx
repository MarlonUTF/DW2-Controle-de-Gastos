import ResumeItem from "./resumeItem";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaDollarSign
} from "react-icons/fa";

export default function ResumeContainer({ income, expense, total }) {
  return (
    <div className="w-[98%] max-w-6xl flex flex-col md:flex-row justify-between gap-4">
      <ResumeItem 
        title="Entradas" 
        Icon={FaRegArrowAltCircleUp} 
        value={income} 
        colorClass="text-green-500"
      />
      <ResumeItem 
        title="Saídas" 
        Icon={FaRegArrowAltCircleDown} 
        value={expense} 
        colorClass="text-red-500"
      />
      <ResumeItem 
        title="Total" 
        Icon={FaDollarSign} 
        value={total} 
        colorClass={total.startsWith("-") ? "text-red-500" : "text-green-500"}
      />
    </div>
  );
}