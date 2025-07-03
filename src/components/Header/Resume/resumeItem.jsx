export default function ResumeItem({ title, Icon, value, colorClass = "text-black" }) {
  // Garantir que valores negativos sejam mostrados em vermelho
  const displayValue = value.startsWith("-") 
    ? `-${value.replace("-", "")}` 
    : value;

  return (
    <div className="bg-white w-full p-4 rounded-xl text-center shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
      <header className="flex justify-center items-center gap-2 mb-2">
        <p className="text-gray-500 text-sm md:text-base">{title}</p>
        <Icon className="text-teal-800" size={20} />
      </header>
      <p className={`text-xl md:text-2xl font-bold ${colorClass} truncate`} title={value}>
        {displayValue}
      </p>
    </div>
  );
}