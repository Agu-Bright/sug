import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const Candidate = ({ name }) => {
  return (
    <Stack
      direction="row"
      sx={{
        // background: "white",
        border: "2px solid white",
        background:
          "linear-gradient( 90deg, rgba(18, 117, 1, 0.98) 0%, rgba(32, 205, 2, 0.98) 100%)",
        width: "100%",
        borderRadius: "5px",
        padding: "8px",
      }}
    >
      <Box sx={{ width: "20%", height: "auto" }}>
        <Avatar
          src="/img/avatar.jpeg"
          sx={{ width: "100%", height: "auto", borderRadius: "5px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "5px",
        }}
      >
        <Typography sx={{ width: "100%", fontWeight: "700", color: "white" }}>
          {name}
        </Typography>
      </Box>
    </Stack>
  );
};

export default Candidate;
