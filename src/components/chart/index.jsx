import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
const Barchart = (props) => {
  Chart.register(...registerables);
  return (
    <div className="box p-2">
      <Bar
        datasetIdKey="id"
        data={{
          labels: props.data.map((val) => val.year),
          datasets: [
            {
              backgroundColor: props.data.map((val) => val.bg),
              barPercentage: 0.2,
              data: props.data.map((val) => val.range),
              label: "Earnings by Year",
            },
          ],
        }}
      />
    </div>
  );
};

export default Barchart;
