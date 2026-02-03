import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import DoughnutChart from "./components/DoughnutChart";

function App() {
  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <BarChart />
      <LineChart />
      <PieChart />
      <DoughnutChart />
    </div>
  );
}

export default App;