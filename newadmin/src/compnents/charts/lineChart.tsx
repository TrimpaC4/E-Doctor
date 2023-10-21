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
      labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
      datasets: [
        {
          label: "Sample Data",
          data: [5, 10, 5, 20, 50, 40],
          borderColor: "white", // Set line color to white
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Set background color to a semi-transparent white
          borderWidth: 2,
          fill: true, // Fill the area under the line
        },
      ],
    };

    const options: ChartOptions = {
      responsive: false,
      plugins: {
        legend: {
          labels: {
            color: "white", // Set legend text color to white
          },
        },
        title: {
          display: true,
          text: "Chart Title",
          color: "white", // Set title text color to white
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "X-axis Label",
            color: "white", // Set X-axis label color to white
          },
          ticks: {
            color: "white", // Set X-axis tick color to white
          },
        },
        y: {
          title: {
            display: true,
            text: "Y-axis Label",
            color: "white", // Set Y-axis label color to white
          },
          ticks: {
            color: "white", // Set Y-axis tick color to white
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
    <div className="card-body p-3">
      <div className="chart">
        <canvas
          ref={canvasRef}
          className="chart-canvas"
          width="500"
          height="400"
        ></canvas>
      </div>
    </div>
  );
};

export default LineChart;
