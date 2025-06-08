import ResumeItem from "./resumeItem";
import {
    FaRegArrowAltCircleUp,
    FaRegArrowAltCircleDown,
    FaDollarSign
} from "react-icons/fa";

export default function ResumeContainer() {
  return (
    <div className="w-full max-w-5xl flex justify-between gap-4 px-4">
      <ResumeItem title="Entradas" Icon={FaRegArrowAltCircleUp} value="100" />
      <ResumeItem title="Saídas" Icon={FaRegArrowAltCircleDown} value="100" />
      <ResumeItem title="Total" Icon={FaDollarSign} value="100" />
    </div>
  );
}
