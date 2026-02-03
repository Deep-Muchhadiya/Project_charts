import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";
import { UserData } from "../types/chart";

const PieChart = () => {
  const [chartData, setChartData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      setChartData(data);
    };

    void fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => {clearInterval(interval);};
  }, []);

  const data = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        label: "Users",
        data: chartData.map((item) => item.value),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <h2>Users Distribution</h2>

      {/* SMALLER PIE */}
      <div
        style={{
          height: "260px",
          width: "260px",
          margin: "auto",
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;