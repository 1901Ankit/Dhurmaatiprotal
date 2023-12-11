import logo from "./logo.svg";
// import "./App.css";
import Sidebar from "./components/sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Login from "./pages/login";
import PLP from "./pages/plp";
import Modal from "./components/modal";
import Dashboard from "./pages/dashboard";
import Order from "./pages/order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // theme=""
      />
      <BrowserRouter>
        <Modal />
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/product-list" element={<PLP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-list" element={<Order/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
