import { useEffect, useState } from "react";
import { Bar, Line, Doughnut, Radar } from "react-chartjs-2";
import data from "./data/frameworks.json";
import Lottie from "lottie-react";
import animation from "./assets/charts.json";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Legend,
  RadialLinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Legend,
  RadialLinearScale,
  ArcElement
);

const colors = [
  "rgba(255, 0, 0, 0.5)",
  "rgba(0, 255, 0, 0.5)",
  "rgba(0, 0, 255, 0.5)",
  "rgba(255, 255, 0, 0.5)",
  "rgba(255, 0, 255, 0.5)",
  "rgba(0, 255, 255, 0.5)",
  "rgba(255, 128, 0, 0.5)",
  "rgba(128, 0, 255, 0.5)",
  "rgba(0, 255, 128, 0.5)",
  "rgba(255, 0, 128, 0.5)",
];

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

function App() {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartType, setChartType] = useState<
    "Bar" | "Line" | "Doughnut" | "Radar"
  >("Bar");

  useEffect(() => {
    const labels = data.techStacks[0].popularityOverTime.map((item) =>
      item.year.toString()
    );
    const datasets = data.techStacks.map((techStack, i) => {
      return {
        label: techStack.name,
        data: techStack.popularityOverTime.map((item) => item.popularity),
        backgroundColor: colors[i],
        borderColor: colors[i],
        borderWidth: 1,
      };
    });
    setChartData({ labels, datasets });
  }, []);

  if (!chartData) return null;

  const ChartComponent = {
    Bar: Bar,
    Line: Line,
    Doughnut: Doughnut,
    Radar: Radar,
  }[chartType];

  return (
    <div className="w-full h-screen p-12 flex items-center justify-center">
      <div className="w-full h-full flex content-center justify-center flex-col items-center">
        <div className="text-center mb-8 flex flex-col justify-center content-center items-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Tech Stack Popularity Over Time
          </h2>
          <div className="flex justify-center items-center gap-5">
            <select
              className="px-4 py-2 border rounded-lg text-lg"
              value={chartType}
              onChange={(e) =>
                setChartType(
                  e.target.value as "Bar" | "Line" | "Doughnut" | "Radar"
                )
              }
            >
              <option>Bar</option>
              <option>Line</option>
              <option>Doughnut</option>
              <option>Radar</option>
            </select>
            <div className="w-[8%]">
              <Lottie animationData={animation} />
            </div>
          </div>
        </div>
        <div className="w-[80%] h-[80%] flex items-center justify-center mb-10 content-center text-center">
          <ChartComponent
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
