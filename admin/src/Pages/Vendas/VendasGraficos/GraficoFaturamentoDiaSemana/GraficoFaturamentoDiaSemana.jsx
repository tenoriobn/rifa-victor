import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from '../VendasGraficos';

export default function GraficoFaturamentoDiario() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Sábado', 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
          datasets: [
            {
              label: 'Faturamento',
              data: [12, 19, 3, 5, 2, 3, 10],
              backgroundColor: '#00b4d8',
              borderColor: '#00b4d8',
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
      <div className="chart-title"><h3>Faturamento - Semanal</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}
