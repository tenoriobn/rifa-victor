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
          labels: ['10', '11', '16'],
          datasets: [
            {
              label: 'Faturamento',
              data: [12, 19, 3],
              backgroundColor: '#f9a826',
              borderColor: '#f9a826',
              borderWidth: 1,
            },
            {
              label: 'Pedidos',
              data: [8, 14, 7],
              backgroundColor: '#1bc47d',
              borderColor: '#1bc47d',
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
      <div className="chart-title"><h3>Faturamento - Diario</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}
