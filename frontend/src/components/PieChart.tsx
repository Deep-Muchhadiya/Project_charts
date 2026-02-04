import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { fetchUserData } from "../services/api";
import { UserData } from "../types/chart";

const PieChart = () => {
  const [chartData, setChartData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUserData();
      // SEMANTIC ERROR 1: Infinite Accumulation
      // Instead of replacing the data, we append the new data to the old data.
      // Every 5 seconds, the array grows larger, duplicates appear, and the chart segments get smaller and smaller.
      setChartData((prev) => [...prev, ...data]);
    };

    void fetchData();
    const interval = setInterval(fetchData, 5000);
    // SEMANTIC ERROR 2: Memory Leak / Zombie Processes
    // We removed the cleanup return function. 
    // If the user navigates away from this page, the interval continues running in the background, 
    // eating up memory and network bandwidth forever.
  }, []);

  const data = {
    // SEMANTIC ERROR 3: Data Integrity Mismatch
    // We are sorting the labels alphabetically, but we are NOT sorting the values.
    // Example: If "USA" was 100 and "Brazil" was 50. 
    // "Brazil" comes before "USA" alphabetically, so "Brazil" gets assigned the first value (100).
    // The chart looks beautiful, but it is effectively lying to the user.
    labels: chartData.map((item) => item.label).sort(),
    datasets: [
      {
        label: "Users",
        data: chartData.map((item) => item.value),
        // SEMANTIC ERROR 4: Visual Misleading
        // We only provided 2 colors. If the API returns 3 or more countries,
        // the remaining countries will be rendered with the default color (usually grey),
        // implying they are "disabled" or "unknown" when they are valid data.
        backgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 2,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    // SEMANTIC ERROR 5: Layout Collapse
    // We set maintainAspectRatio to true inside a container with fixed height/width dimensions.
    // Chart.js will try to respect the canvas aspect ratio over the container's CSS,
    // often leading to the chart appearing tiny or refusing to resize correctly.
    maintainAspectRatio: true,
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