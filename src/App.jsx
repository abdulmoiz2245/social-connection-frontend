import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Suggestion from "./components/Suggestion";
import SentRequest from "./components/SentRequest";
import ReceivedRequest from "./components/ReceivedRequest";
import Connection from "./components/Connection";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route path="/suggestions" element={<Suggestion />} />
        <Route path="/sent-request" element={<SentRequest />} />
        <Route path="/recived-request" element={<ReceivedRequest />} />
        <Route path="/connections" element={<Connection />} />
      </Route>
    </Routes>
  );
}

export default App;
