"use client";

import React, { useContext, useEffect } from "react";
import "./candidates.css";
import { Box, Stack, Typography, Grid, Paper } from "@mui/material";
import Candidate from "@/components/Candidate";
import { GeneralContext } from "@/context/GeneralContext";
import axios from "axios";

const page = () => {
  const { token, URL, candidates } = useContext(GeneralContext);
  const candidateLength = candidates.length;
  if (token)
    return (
      <div className="candidates">
        <Stack
          className="candidates-box"
          direction="column"
          justifyContent="space-between"
          sx={{ paddingTop: "50px" }}
        >
          <Box sx={{ height: "20%" }}>
            <Typography className="topic">Cast Votes!</Typography>
            <Typography className="text-2" sx={{ fontWeight: "300" }}>
              Choose your preferred four candidates for this position
            </Typography>
            <Typography className="text-3">
              POSITION: <span className="text-3-span">SUG PRESIDENCY</span>{" "}
            </Typography>
          </Box>

          <Box
            sx={{
              height: "70%",
              padding: "10px",
              overflowY: "scroll",
              scrollbarWidth: "2px", // For Firefox
              "&::-webkit-scrollbar": {
                display: "none", // For Chrome, Safari, and Edge
              },
            }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {Array.from(Array(6)).map((_, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Candidate />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button
              className="next_button"
              // onClick={() => router.push("/candidates")}
            >
              Next
            </button>
          </Box>
        </Stack>
      </div>
    );
};

export default page;
