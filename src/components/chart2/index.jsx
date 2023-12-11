import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
const Linechart = (props) => {
  Chart.register(...registerables);
  return (
    <div className="box p-2">
      <Line
        datasetIdKey="id"
        data={{
          labels: props.data.map((val) => val.month),
          datasets: [
            {
              backgroundColor: props.data.map((val) => val.bg),
              barPercentage: 0.2,
              data: props.data.map((val) => val.range),
              label: "Earnings of  2023",
            },
            {
              backgroundColor: props.data1.map((val) => val.bg),
              barPercentage: 0.2,
              data: props.data1.map((val) => val.range),
              label: "Earnings of  2022",
            },
          ],
        }}
      />
    </div>
  );
};

export default Linechart;
