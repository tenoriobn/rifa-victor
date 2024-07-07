import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from '../VendasGraficos';

export default function GraficoFaturamentoDiario() {
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

    // Limpeza para destruir o gráfico quando o componente for desmontado
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <ContainerCharts className="container-charts">
      <div className="chart-title"><h3>Faturamento - Dia da Semana</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}
