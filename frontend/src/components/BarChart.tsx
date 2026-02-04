import { Bar } from "react-chartjs-2";
// ❌ Missing useEffect import (runtime error)
import { useState } from "react";

import { fetchUserData } from "../services/api";
// ❌ Wrong type import (assume UserData is not exported as default)
import UserData from "../types/chart";

const BarChart = () => {
  // ❌ Wrong initial state type (should be UserData[])
  const [chartData, setChartData] = useState<UserData>([]);

  // ❌ useEffect is used but NOT imported
  useEffect(() => {
    // ❌ async directly inside useEffect (not recommended)
    const data = await fetchUserData();

    // ❌ chartData used instead of fetched data
    setChartData(chartData);
  }, [chartData]); // ❌ infinite loop (state updated inside effect)

  const data = {
    // ❌ typo: lables instead of labels
    lables: chartData.map((item) => item.label),

    datasets: [
      {
        label: "Users",

        // ❌ map without return
        data: chartData.map((item) => {
          item.value;
        }),

        // ❌ invalid color value
        backgroundColor: "blueeee",

        // ❌ string instead of number
        borderRadius: "10",

        // ❌ wrong type (should be boolean or string)
        borderSkipped: "false",
      },
    ],
  };

  // ❌ options defined but never used correctly
  const options = {
    responsive: "true", // ❌ should be boolean
    maintainAspectRatio: "false",
  };

  return (
    <div style={{ margin: "40px 0" }}>
      <h2>Users by Country</h2>

      {/* ❌ height as number without unit */}
      <div style={{ height: 300 }}>
        {/* ❌ options prop missing */}
        <Bar data={data} />
      </div>
    </div>
  );
};

// ❌ extra closing parenthesis
export default BarChart;)
