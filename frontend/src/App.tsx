import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import DoughnutChart from "./components/DoughnutChart";

const APP_CONTAINER_STYLE = {
  width: "70%",
  margin: "auto",
};

function App() {
  return (
    <div style={APP_CONTAINER_STYLE}>
      <BarChart />
      <LineChart />
      <PieChart />
      <DoughnutChart />
    </div>
  );
}

export default App;