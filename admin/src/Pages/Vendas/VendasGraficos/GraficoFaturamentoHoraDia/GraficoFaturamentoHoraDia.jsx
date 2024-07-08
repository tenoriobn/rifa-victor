import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from '../VendasGraficos';

export default function GraficoFaturamentoHora() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: 'bar', // ou 'line', 'pie', etc.
        data: {
          labels: ['10', '11', '16', '17', '19', '9', '23', '22', '21', '20', '15', '14', '13', '7', '8', '12', '5', '1', '0', '6'],
          datasets: [
            {
              label: 'Faturamento',
              data: [12, 19, 3, 5, 2, 3, 10, 12, 19, 3, 5, 2, 3, 10, 12, 19, 3, 5, 2, 6],
              backgroundColor: '#b5179e',
              borderColor: '#b5179e',
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
