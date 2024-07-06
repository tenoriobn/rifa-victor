import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chart from 'chart.js/auto';

const ContainerCharts = styled.div`
  flex-grow: 1;
  flex-basis: calc(50% - 10px);
  height: 300px;
  background-color: #292727;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

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
          labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
          datasets: [
            {
              label: 'Faturamento',
              data: [12, 19, 3, 5, 2, 3, 10],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
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
      <div className="chart-title"><h3>Faturamento Diário</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}
