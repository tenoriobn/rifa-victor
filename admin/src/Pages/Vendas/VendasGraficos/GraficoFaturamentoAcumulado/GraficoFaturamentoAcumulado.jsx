import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from '../VendasGraficos';
import { stateDadosVendas } from '../../../../common/states/atom';
import {  useRecoilValue } from "recoil";

export default function GraficoFaturamentoAcumulado() {
  const dadosVendas = useRecoilValue(stateDadosVendas);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Processa os dados: Inverte a ordem e formata a data
      const entries = Object.entries(dadosVendas?.faturamentoAcumulado || {}).reverse();
      const labels = entries.map(([data]) => {
        const localDate = new Date(`${data}T00:00:00`); // Força o horário para 00:00 na hora local
        return localDate.toLocaleDateString('pt-BR');
      });
      const dadosTotalAprovado = entries.map(([, item]) => parseFloat(item.totalAprovado) || 0);
      const dadosTotalPedidos = entries.map(([, item]) => item.totalPedidos || 0);

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Faturamento',
              data: dadosTotalAprovado,
              backgroundColor: '#e63946',
              borderColor: '#e63946',
              borderWidth: 1,
            },
            {
              label: 'Pedidos',
              data: dadosTotalPedidos,
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
              ticks: {
                callback: function (value) {
                  // Formata os valores no eixo Y como reais
                  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                },
              },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.dataset.label || '';
                  const value = context.raw;
                  if (label === 'Faturamento') {
                    return `${label}: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                  }
                  return `${label}: ${value}`; // Para Pedidos, apenas mostra o número
                },
              },
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
  }, [dadosVendas]);

  return (
    <ContainerCharts className="container-charts">
      <div className="chart-title"><h3>Faturamento - Acumulado</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}