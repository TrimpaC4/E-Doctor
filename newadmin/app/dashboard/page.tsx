"use client";
import React, { useEffect, useRef } from "react";
import dashboardStyle from "./dashboard.module.css";
import LineChart from "../../src/compnents/charts/lineChart";
import PieChart from "../../src/compnents/charts/pieChart";
import BarChart from "../../src/compnents/charts/barChart";
import BarHorizontalChart from "../../src/compnents/charts/horizontalBarChart";
import Table from "../../src/compnents/table/table";
import NumOfPatient from "../assets/patient.png";
import NumOfDoctor from "../assets/doctor.png";
import NumOfAppointment from "../assets/schedule.png";
import incomes from "../assets/payment.png";
import Image from "next/image";

const Dashboard: React.FC = () => {
  const horizontalBarChartData = {
    labels: ["Label 1", "Label 2", "Label 3"],
    values: [30, 40, 30],
    colors: ["red", "blue", "green"],
  };

  return (
    <div className={dashboardStyle.dashboard_main_container}>
      <div className={dashboardStyle.dashboard_container}>
        <div className={dashboardStyle.dashboardTop}>
          <p>Patients Statistics</p>
          <div className={dashboardStyle.dashboardAccounts}>
            <img src="" alt="" />
            <p>Account</p>
          </div>
        </div>
        <div className={dashboardStyle.widgets}>
          <div className={dashboardStyle.Counters}>
            <div>
              <section className={dashboardStyle.aa}>
                <p>Number Of Patients</p>
                <p>2,300</p>
                <p>+55% since yesterday</p>
              </section>
              <Image src={NumOfPatient} alt="Number of Patients" />
            </div>
            <div>
              <section className={dashboardStyle.aa}>
                <p>Number Of Doctor</p>
                <p>2,300</p>
                <p>+3% since last week</p>
              </section>
              <Image src={NumOfDoctor} alt="aaaa" />
            </div>
            <div>
              <section className={dashboardStyle.aa}>
                <p>Number Of Appointment</p>
                <p>2,300</p>
                <p>-2% since last quarter</p>
              </section>
              <Image src={NumOfAppointment} alt="" />
            </div>
            <div>
              <section className={dashboardStyle.aa}>
                <p>Incomes</p>
                <p>$103,430</p>
                <p>+5% than last month</p>
              </section>
              <Image src={incomes} alt="" />
            </div>
          </div>
          <div className={dashboardStyle.lists}>
            <div>
              <LineChart
                data={{
                  labels: [],
                  values: [],
                }}
              />
            </div>
            <div>
              <PieChart />
            </div>
          </div>
          <div className={dashboardStyle.patient_data}>
            <div>
              <BarHorizontalChart
                data={{
                  labels: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
                  values: [5, 40, 30, 20, 23, 60],
                  colors: ["blue"],
                }}
              />
            </div>
            <div>
              <Table />
            </div>
          </div>
        </div>
        <div className={dashboardStyle.widgets}>
          <div className={dashboardStyle.Counters}>
            <p>doctor statistic</p>
          </div>
          <div className={dashboardStyle.lists}>
            <div>
              <BarHorizontalChart
                data={{
                  labels: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
                  values: [5, 40, 30, 20, 23, 60],
                  colors: ["blue"],
                }}
              />
            </div>
            <div>
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /* <LineChart
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
      /> */
}
