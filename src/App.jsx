import { Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import Doctor from "./Doctor";
import NavBar from "./Navbar";
import Receptionist from "./Reception";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/Reception" element={<Receptionist />} />
        <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </>
  );
}
