import GraficoAlimentacao from "./graficoAlimentacao";

export default function Graficos({ dados }) {
  return (
    <div className="graficos-container">
      <h2>Gráficos de Alimentação</h2>
      <GraficoAlimentacao dados={dados} />
      {/* Você pode adicionar mais gráficos aqui, como GraficoExercicios, GraficoSono, etc. */}
    </div>
  );
}