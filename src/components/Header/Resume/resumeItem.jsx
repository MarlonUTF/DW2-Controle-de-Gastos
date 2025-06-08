export default function ResumeItem({ title, Icon, value }) {
  return (
    <div className="bg-white w-full p-6 rounded-xl text-center shadow-md">
      <header className="flex justify-center items-center gap-2 mb-2">
        <p className="text-gray-500">{title}</p>
        <Icon size={22} className="text-teal-800" />
      </header>
      <p className="text-2xl font-bold text-black">{value}</p>
    </div>
  );
}
