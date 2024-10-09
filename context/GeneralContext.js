"use client";

import React, { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [active, setActive] = useState("");
  const URL = "https://futo-sug-backend.onrender.com/api/v1";
  const [loading, setLoading] = useState(false);
  return (
    <GeneralContext.Provider
      value={{ active, setActive, loading, setLoading, URL, active, setActive }}
    >
      {children}
      <ToastContainer />
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
