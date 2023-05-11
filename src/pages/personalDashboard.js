import React from "react";
import { useNavigate } from "react-router-dom";
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
import { Button } from "@mui/material";

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
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(apiUrl)
        .then((response) => {
          console.log(response.data);
          setDataCloud(response.data.feeds);
        })
        .catch((error) => {
          console.error(error);
        });
      setCounter((prevCounter) => prevCounter + 1);
      console.log(counter);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("login") || localStorage.getItem("login") == "") {
      navigate("/iot-temperature-sensor/");
    }
  }, []);

  return (
    <div>
      {" "}
      <Line options={options} data={data} />
      <br />
      <br />
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          localStorage.setItem("login", "");
          navigate("/iot-temperature-sensor/");
        }}
      >
        Logout
      </Button>{" "}
    </div>
  );
}
