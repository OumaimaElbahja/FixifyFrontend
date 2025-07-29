import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/public/HomePage";
import "./globals.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
export default App;