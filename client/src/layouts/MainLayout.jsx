import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const MainLayout = ({ children }) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
};
