import React from "react";
import "../App.css";

import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("login") || localStorage.getItem("login") == "") {
      navigate("/");
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <iframe
          width="450"
          height="260"
          style={{ border: "1px solid #cccccc" }}
          src="https://thingspeak.com/channels/2140743/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&title=Courbe+de+temp%C3%A9rature&type=spline&xaxis=Temps&yaxis=Temp%C3%A9rature+%28C%C2%B0%29"
        ></iframe>
      </header>
    </div>
  );
}

export default App;
