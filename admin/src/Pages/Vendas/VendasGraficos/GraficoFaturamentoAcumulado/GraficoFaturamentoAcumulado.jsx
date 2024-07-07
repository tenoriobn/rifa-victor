import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from '../VendasGraficos';

export default function GraficoFaturamentoAcumulado() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      // Destrua a instância anterior do gráfico se ela existir
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Crie um novo gráfico e armazene a instância na ref
      chartRef.current = new Chart(ctx, {
        type: 'bar', // ou 'line', 'pie', etc.
        data: {
          labels: ['10', '11', '16'],
          datasets: [
            {
              label: 'Faturamento',
              data: [12, 19, 3],
              backgroundColor: '#e63946',
              borderColor: '#e63946',
              borderWidth: 1,
            },
            {
              label: 'Pedidos',
              data: [8, 14, 7],
              backgroundColor: '#457b9d',
              borderColor: '#457b9d',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Limpeza para destruir o gráfico quando o componente for desmontado
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <ContainerCharts className="container-charts">
      <div className="chart-title"><h3>Faturamento - Hora do Dia</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}
