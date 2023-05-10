import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import faker from "faker";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function PersonalDashboard() {
  const [dataCloud, setDataCloud] = React.useState([]);
  const data = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data: labels.map(() => dataCloud.field1),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const apiUrl =
    "https://api.thingspeak.com/channels/2140743/feeds.json?results=8000";

  React.useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setDataCloud(response.data.feeds);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  React.useEffect(() => {
    console.log(dataCloud);
  }, [dataCloud]);

  return (
    <div>
      {" "}
      <Line options={options} data={data} />{" "}
    </div>
  );
}
