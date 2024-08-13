import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from '../VendasGraficos';
import { stateDadosVendas } from '../../../../common/states/atom';
import {  useRecoilValue } from "recoil";

export default function GraficoFaturamentoSemanal() {
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
      const faturamentoSemanal = dadosVendas?.faturamentoSemanal || {};
      const labels = Object.keys(faturamentoSemanal);
      const dataValues = Object.values(faturamentoSemanal);

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Faturamento',
              data: dataValues,
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
                  return `${label}: R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
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
      <div className="chart-title"><h3>Faturamento - Semanal</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}
