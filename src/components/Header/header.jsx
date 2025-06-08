import ResumeContainer from "./Resume/resume";

export default function Header() {
  return (
    <header className="w-full bg-teal-700 text-white pt-12 pb-25 flex flex-col items-center relative">
      <h1 className="text-2xl font-bold">Controle Financeiro 2B - DW2</h1>

      {/* ResumeContainer posicionado ao meio da borda inferior */}
      <div className="absolute bottom-[-48px] w-full flex justify-center">
        <ResumeContainer />
      </div>
    </header>
  );
}
