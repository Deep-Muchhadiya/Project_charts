import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";
import { UserData } from "../types/chart";

const DoughnutChart = () => {
  const [chartData, setChartData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      setChartData(data);
    };

    void fetchData(); // initial load
    const interval = setInterval(fetchData, 5000); // auto-refresh

    return () => {clearInterval(interval);};
  }, []);

  const data = {
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        label: "Users",
        data: chartData.map((item) => item.value),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        borderColor: "#ffffff",
        borderWidth: 2,
        borderRadius: 10,   // rounded edges
        cutout: "70%",      // thickness of doughnut
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <h2>Users Distribution (Doughnut)</h2>

      <div
        style={{
          height: "260px",
          width: "260px",
          margin: "auto",
        }}
      >
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;