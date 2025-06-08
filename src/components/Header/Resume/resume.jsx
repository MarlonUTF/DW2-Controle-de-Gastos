import ResumeItem from "./resumeItem";
import {
    FaRegArrowAltCircleUp,
    FaRegArrowAltCircleDown,
    FaDollarSign
} from "react-icons/fa";

export default function ResumeContainer({ income, expense, total }) {
  return (
    <div className="w-[98%] max-w-[1120px] flex justify-between gap-4">
      <ResumeItem title="Entradas" Icon={FaRegArrowAltCircleUp} value={income} />
      <ResumeItem title="Saídas" Icon={FaRegArrowAltCircleDown} value={expense} />
      <ResumeItem title="Total" Icon={FaDollarSign} value={total} />
    </div>
  );
}
