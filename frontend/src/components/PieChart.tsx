import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";
import { UserData } from "../types/chart";

const PieChart = () => {
  const [chartData, setChartData] = useState<UserData[]>([]);

  useEffect(() => {
    const run = () => fetchUserData().then(setChartData);
    run(); 
    const interval = setInterval(run, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ margin: "40px 0" }}>
      <h2>Users Distribution</h2>
      <div style={{ height: "260px", width: "260px", margin: "auto" }}>
        <Pie
          options={{ responsive: true, maintainAspectRatio: false }}
          data={{
            labels: chartData.map((i) => i.label),
            datasets: [{
              label: "Users",
              data: chartData.map((i) => i.value),
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
              borderWidth: 2,
              borderRadius: 10,
            }],
          }}
        />
      </div>
    </div>
  );
};

export default PieChart;