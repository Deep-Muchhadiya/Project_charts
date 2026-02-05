import { Bar } from "react-chartjs-2";
import { useEffect, useState, useMemo } from "react";
import { fetchUserData } from "../services/api";
import { UserData } from "../types/chart";

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
};

const CONTAINER_STYLE = {
  margin: "40px 0",
};

const CHART_WRAPPER_STYLE = {
  height: "300px",
};

const BarChart = () => {
  const [chartData, setChartData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      setChartData(data);
    };

    void fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const data = useMemo(() => {
    return {
      labels: chartData.map((item) => item.label),
      datasets: [
        {
          label: "Users",
          data: chartData.map((item) => item.value),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderRadius: 10,
          borderSkipped: false, // Ensures rounded corners on all sides if desired
        },
      ],
    };
  }, [chartData]);

  return (
    <div style={CONTAINER_STYLE}>
      <h2>Users by Country</h2>
      <div style={CHART_WRAPPER_STYLE}>
        <Bar data={data} options={CHART_OPTIONS} />
      </div>
    </div>
  );
};

export default BarChart;