import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";
import { UserData } from "../types/chart";

const LineChart = () => {
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
        label: "User Growth",
        data: chartData.map((item) => item.value),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <h2>User Growth</h2>

      {/* HEIGHT CONTROL */}
      <div style={{ height: "280px" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;