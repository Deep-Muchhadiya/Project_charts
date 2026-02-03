import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";
import { UserData } from "../types/chart";

const BarChart = () => {
  const [chartData, setChartData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      setChartData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        label: "Users",
        data: chartData.map((item) => item.value),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <h2>Users by Country</h2>

      {/* HEIGHT CONTROL */}
      <div style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;