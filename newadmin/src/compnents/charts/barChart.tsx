"use client";
import React, { useEffect, useRef } from "react";
import Chart, {
  ChartData,
  ChartConfiguration,
  ChartOptions,
} from "chart.js/auto";
import dashboardStyle from "./dashboard.module.css";

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
}

const barChart: React.FC<PieChartProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const barChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");

      // Destroy the previous chart if it exists
      if (barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }

      barChartRef.current.chart = new Chart(
        ctx as CanvasRenderingContext2D,
        getBarChartConfig()
      );
    }
  }, []);

  const getBarChartConfig = (): ChartConfiguration => {
    const data: ChartData = {
      labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "label 6", "label 6", "label 6", "label 6"],
      datasets: [
        {
          label: "Bar Chart Data",
          data: [10, 20, 30, 40, 10, 30],
          backgroundColor: ["red", "blue", "green", "orange", "purple"],
          borderColor: ["red", "blue", "green", "orange", "purple"],
          borderWidth: 1,
        },
      ],
    };

    const options: ChartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return {
      type: "bar",
      data,
      options,
    };
  };

  return (

        <div className="chart">
          <canvas
            ref={barChartRef}
            className="chart-canvas"
            width="700"
            height="400"
          ></canvas>
        </div>
  );
};

export default barChart;
