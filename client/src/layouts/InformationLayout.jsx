import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const InformationLayout = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Header />
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default InformationLayout;
