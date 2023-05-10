import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { Toaster } from "react-hot-toast";
import PersonalDashboard from "./pages/personalDashboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/iot-temperature-sensor/home"
            element={<PersonalDashboard />}
          />
          <Route path="/iot-temperature-sensor/home2" element={<Home />} />
          <Route path="/iot-temperature-sensor/*" element={<Login />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
