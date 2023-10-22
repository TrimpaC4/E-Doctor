"use client";
import React, { useEffect, useRef } from "react";
import Chart, {
  ChartData,
  ChartConfiguration,
  ChartOptions,
} from "chart.js/auto";

interface LineChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(
        ctx as CanvasRenderingContext2D,
        getChartConfig()
      );
    }
  }, [data]);

  const getChartConfig = (): ChartConfiguration => {
    const data: ChartData = {
      labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5", "label 6"],
      datasets: [
        {
          data: [5, 10, 15, 20, 10, 15],
          borderColor: "#6276E5", // Default line color for light mode
          backgroundColor: "transparent", // Default background color for light mode
          borderWidth: 3,
          fill: true, // Fill the area under the line
        },
      ],
    };

    const options: ChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false, // Hide the legend
        },
        title: {
          display: true,
          color: "black", // Default title text color for light mode
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            color: "#6276E5", // Default X-axis label color for light mode
          },
          ticks: {
            color: "black", // Default X-axis tick color for light mode
          },
        },
        y: {
          title: {
            display: true,
            color: "black", // Default Y-axis label color for light mode
          },
          ticks: {
            color: "black", // Default Y-axis tick color for light mode
          },
        },
      },
    };

    return {
      type: "line",
      data,
      options,
    };
  };

  return (
      <div className="chart">
        <canvas
          ref={canvasRef}
          className="chart-canvas"
          width="800"
          height="400"
        ></canvas>
      </div>
  );
};

export default LineChart;
