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
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

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
            text: "Temperature Sensor Dashboard",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function PersonalDashboard() {
    const [dataCloud, setDataCloud] = React.useState([]);
    const [chartData, setChartData] = React.useState(null);
    const navigate = useNavigate();
    const apiUrl = "https://api.thingspeak.com/channels/2140743/feeds.json?results=8000";

    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setCounter((prevCounter) => prevCounter + 1);
            console.log(counter);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [counter]);

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
    }, [counter]);

    React.useEffect(() => {
        if (dataCloud.length > 0) {
            const data = {
                labels: dataCloud.map((item) => item.created_at),
                datasets: [
                    {
                        label: "Temperature",
                        data: dataCloud.map((item) => item.field1),
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                ],
            };
            setChartData(data);
        }
    }, [dataCloud]);

    React.useEffect(() => {
        if (!localStorage.getItem("login") || localStorage.getItem("login") === "") {
            navigate("/iot-temperature-sensor/");
        }
    }, []);

    return (
        <>
            <div style={{ width: "80%", height: "400px", margin:"auto",display:"flex",justifyContent:"center"}}>
                {chartData && <Line options={options} data={chartData} />}
            </div>
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
        </>
    );
}
