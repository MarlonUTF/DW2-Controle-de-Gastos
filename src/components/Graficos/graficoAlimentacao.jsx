import Chart from 'chart.js/auto';

export default function GraficoAlimentacao({ dados }) {
  const ctx = document.getElementById('graficoAlimentacao');

  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Café da Manhã', 'Almoço', 'Jantar'],
        datasets: [
          {
            label: 'Calorias',
            data: [dados.caloriasCafe, dados.caloriasAlmoco, dados.caloriasJantar],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }

  return <canvas id="graficoAlimentacao" width="400" height="400"></canvas>;
}