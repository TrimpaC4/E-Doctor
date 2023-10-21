"use client";
import React, { useEffect, useRef } from "react";
import dashboardStyle from "./dashboard.module.css";
import LineChart from "../../src/compnents/charts/lineChart";
import PieChart from "../../src/compnents/charts/pieChart";
import BarChart from "../../src/compnents/charts/barChart";
import BarHorizontalChart from "../../src/compnents/charts/horizontalBarChart";

const Dashboard: React.FC = () => {

    const horizontalBarChartData = {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        values: [30, 40, 30],
        colors: ['red', 'blue', 'green'],
      };

  return (
    <div className={dashboardStyle.dashboard_main_container}>
        
    </div>
  );
};

export default Dashboard;





      {/* <LineChart
        data={{
          labels: [],
          values: []
        }}
      />
      <PieChart
        data={{
          labels: [],
          values: [],
          colors: [],
        }}
      />
      <BarChart
        data={{
          labels: [],
          values: [],
          colors: [],
        }}
      />
      <BarHorizontalChart
        data={{
            labels: ['Label 1', 'Label 2', 'Label 3'],
            values: [30, 40, 30],
            colors: ['red', 'blue', 'green'],
        }}
      /> */}