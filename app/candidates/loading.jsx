import { CircularProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <CircularProgress sx={{ color: "white" }} size={25} />
    </div>
  );
};

export default loading;
