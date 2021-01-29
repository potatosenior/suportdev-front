import React from "react";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <div className="pg-container">
      <Navbar></Navbar>

      <div className="pg-content al-center">
        <h1>Sistema de gerenciamento de chamados</h1>
      </div>
    </div>
  );
};

export default Home;
