import ResumeContainer from "./Resume/resume";

export default function Header({ income, expense, total }) {
  return (
    <header className="w-full bg-teal-700 text-white pt-12 flex flex-col items-center relative z-20 pb-22">
      <h1 className="text-2xl font-bold">Controle Financeiro 2B - DW2</h1>

      {/* ResumeContainer posicionado ao meio da borda inferior */}
      <div className="absolute -bottom-8 w-full flex justify-center">
        <ResumeContainer income={income} expense={expense} total={total} />
      </div>
    </header>
  );
}