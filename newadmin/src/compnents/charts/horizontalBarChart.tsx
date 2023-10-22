import React, { useEffect, useRef } from "react";
import Chart, {
  ChartData,
  ChartConfiguration,
  ChartOptions,
} from "chart.js/auto";

interface HorizontalBarChartProps {
  data: {
    labels: string[];
    values: number[];
    colors: string[];
  };
}

const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      // Destroy the previous chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(
        ctx as CanvasRenderingContext2D,
        getHorizontalBarChartConfig(data)
      );
    }
  }, [data]);

  const getHorizontalBarChartConfig = (data: HorizontalBarChartProps["data"]): ChartConfiguration => {
    const chartData: ChartData = {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: data.colors,
        borderRadius: 8, 
      }],
    };

    const options: ChartOptions = {
      responsive: false,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            stepSize: 10, // Set the step size for x-axis labels
            min: 0, // Set the minimum value for the x-axis
            max: 60, // Set the maximum value for the x-axis
          }, // Start the x-axis at 0
        },
        y: {
          beginAtZero: true, // Start the y-axis at 0
        },
      },
    };

    return {
      type: "bar", // Use "bar" type for a horizontal bar chart
      data: chartData,
      options: options,
    };
  };

  return (
      <div className="chart">
        <canvas
          ref={canvasRef}
          className="chart-canvas"
          width="500"
          height="400"
        ></canvas>
      </div>
  );
};

export default HorizontalBarChart;
