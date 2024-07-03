// please install npm install react-apexcharts apexcharts
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts"; // Import the Chart component from react-apexcharts

function Piechart() {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const label_list = ["Rejected", "Approved", "Pending"];
  const mark_list = [40, 360, 79];
  useEffect(() => {
    setValues(mark_list);
    setLabels(label_list);
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        <Chart
          type="pie"
          width={400}
          height={400}
          series={values}
          options={{
            title: { text: "Employees PieChart" },
            noData: { text: "Empty Data" },
            colors: ["#c24949", "#00df7f", "#faee03"],
            labels: labels,
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}
export default Piechart;
