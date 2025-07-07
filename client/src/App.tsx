import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import "./index.css";
import Private from "./routes/PrivateRoute";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Private />} />
        <Route path="/profile" element={<Private />} />
      </Routes>
      
    </div>
  );
}

export default App;
