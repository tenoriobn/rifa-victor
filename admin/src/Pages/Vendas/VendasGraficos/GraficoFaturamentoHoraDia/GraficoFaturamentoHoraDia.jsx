import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { ContainerCharts } from '../VendasGraficos';
import { stateDadosVendas } from '../../../../common/states/atom';
import {  useRecoilValue } from "recoil";

export default function GraficoFaturamentoHora() {
  const dadosVendas = useRecoilValue(stateDadosVendas);

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }



      // Gera as labels de horas no formato 'HH:00'
      const horasLabels = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

      // Dados formatados
      const dadosFormatados = (dadosVendas?.horaDoDia || Array(24).fill(0)).map(valor => parseFloat(valor));

      chartRef.current = new Chart(ctx, {
        type: 'bar', // ou 'line', 'pie', etc.
        data: {
          labels: horasLabels,
          datasets: [
            {
              label: 'Faturamento',
              data: dadosFormatados,
              backgroundColor: '#b5179e',
              borderColor: '#b5179e',
              borderWidth: 1,
              // Adiciona formatação ao tooltip
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const valor = context.raw;
                    return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
                  },
                },
              },
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
                  // Formata os valores no eixo Y
                  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
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
      <div className="chart-title"><h3>Faturamento - Hora</h3></div>
      <canvas ref={canvasRef}></canvas>
    </ContainerCharts>
  );
}