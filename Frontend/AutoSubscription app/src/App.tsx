import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  return (
    <section className="container">
      <Navbar />
        <Outlet />
      <Footer />
    </section>
  )
}

export default App
