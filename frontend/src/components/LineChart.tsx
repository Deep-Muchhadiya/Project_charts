import { Line } from "react-chartjs-2";
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
  height: "280px",
};

const LineChart = () => {
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
          label: "User Growth",
          data: chartData.map((item) => item.value),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4, // Smooths the curve
          fill: true,
        },
      ],
    };
  }, [chartData]);

  return (
    <div style={CONTAINER_STYLE}>
      <h2>User Growth</h2>
      <div style={CHART_WRAPPER_STYLE}>
        <Line data={data} options={CHART_OPTIONS} />
      </div>
    </div>
  );
};

export default LineChart;