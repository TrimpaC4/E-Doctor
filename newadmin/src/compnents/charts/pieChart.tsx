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

const pieChart: React.FC<PieChartProps> = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext("2d");

      // Destroy the previous chart if it exists
      if (pieChartRef.current.chart) {
        pieChartRef.current.chart.destroy();
      }

      pieChartRef.current.chart = new Chart(
        ctx as CanvasRenderingContext2D,
        getPieChartConfig()
      );
    }
  }, []);

  const getPieChartConfig = (): ChartConfiguration => {
    const data: ChartData = {
      labels: ["Label 1", "Label 2", "Label 3"],
      datasets: [
        {
          data: [50, 20],
          backgroundColor: ["red", "blue", "green"],
        },
      ],
    };

    const options: ChartOptions = {
      responsive: false,
    };

    return {
      type: "pie",
      data,
      options,
    };
  };

  return (
        <div className="chart">
          <canvas
            ref={pieChartRef}
            className="chart-canvas"
            width="350"
            height="350"
          ></canvas>
        </div>
  );
};

export default pieChart;
