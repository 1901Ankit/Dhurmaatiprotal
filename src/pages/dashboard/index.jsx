import React from "react";
import Barchart from "../../components/chart";
import { data } from "../../components/assests/data/data";
import Linechart from "../../components/chart2";

const Dashboard = () => {
  return (
    <div className="main-wrapper">
      <div className="p-2">
        <h5>Dashboard</h5>
      </div>
      <div className="container ">
        <div className="row">
          <div className="col-sm-6">
            <Barchart data={data.labels} />
          </div>
          <div className="col-sm-6">
            <Linechart data={data.lineChart} data1={data.lineChart2022} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
