import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from '../VendasGraficos';
import { stateDadosVendas } from '../../../../common/states/atom';
import {  useRecoilValue } from "recoil";

export default function GraficoFaturamentoDiario() {
  const dadosVendas = useRecoilValue(stateDadosVendas);
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Processa os dados para o gráfico
      const faturamentoDiario = dadosVendas?.faturamentoDiario || {};
      const labels = Object.keys(faturamentoDiario).map((dia) => dia);
      const dadosTotalAprovado = Object.values(faturamentoDiario).map((item) => parseFloat(item.totalAprovado) || 0);
      const dadosTotalPedidos = Object.values(faturamentoDiario).map((item) => item.totalPedidos || 0);

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Faturamento',
              data: dadosTotalAprovado,
              backgroundColor: '#f9a826',
              borderColor: '#f9a826',
              borderWidth: 1,
            },
            {
              label: 'Pedidos',
              data: dadosTotalPedidos,
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
              ticks: {
                callback: function (value) {
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
      <div className="chart-title"><h3>Faturamento - Diário</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}
