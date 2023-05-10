import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
