import { Bar } from "react-chartjs-2";
import { useEffect, useState, useMemo } from "react";
import { fetchUserData } from "../services/api";
import { UserData } from "../types/chart";

const BarChart = () => {
  const [chartData, setChartData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // AbortController prevents race conditions and memory leaks on unmount
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await fetchUserData({ signal: controller.signal });
        setChartData(data);
        setError(null);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError("Failed to sync data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Increased interval for scalability

    return () => {
      clearInterval(interval);
      controller.abort(); // Cancel pending requests
    };
  }, []);

  // useMemo prevents expensive re-calculations on every re-render
  const data = useMemo(() => ({
    labels: chartData.map((item) => item.label),
    datasets: [
      {
        label: "Users",
        data: chartData.map((item) => item.value),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderRadius: 10,
      },
    ],
  }), [chartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true }
    }
  };

  if (loading && chartData.length === 0) return <div>Loading Analytics...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ margin: "40px 0" }}>
      <h2>Users by Country</h2>
      <div style={{ height: "300px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;