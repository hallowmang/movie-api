import "swiper/swiper.min.css";
import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Routess from "./config/Routes";

function App() {
  return (
    <BrowserRouter>
      {/* <Route
        render={(props) => (
          <>
            <Header {...props} />
            <Rauta />
            <Footer />
          </>
        )}
      /> */}
      <Header />
      <Routess />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
