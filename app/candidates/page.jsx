"use client";

import React, { useContext, useEffect, useState } from "react";
import "./candidates.css";
import {
  Box,
  Stack,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import Candidate from "@/components/Candidate";
import { GeneralContext } from "@/context/GeneralContext";
import BasicModal from "@/components/Modal";

const page = () => {
  const { token, URL, candidates, loadindCandidates } =
    useContext(GeneralContext);
  const candidateLength = candidates?.length;
  const [currentPosition, setCurrentPosition] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  currentPosition && console.log("currentPosition", currentPosition);

  useEffect(() => {
    if (candidates?.length > 0) {
      setCurrentPosition(candidates[currentIndex]);
    }
  }, [currentIndex, candidates]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      if (currentIndex !== 0) {
        return prev - 1;
      }
    });
  };
  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (currentIndex !== candidateLength) {
        return prev + 1;
      }
    });
  };

  const handleModal = () => {
    setOpen(true);
  };
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = async () => {
    try {
      setIsSending(true);
      const { data } = await axios.post(`${URL}/`);
      console.log(data);
      setIsSending(false);
    } catch (error) {
      console.log(error);
      setIsSending(false);
    }
  };

  if (token)
    return (
      <div className="candidates">
        {loadindCandidates && (
          <CircularProgress sx={{ color: "white" }} size={30} />
        )}

        {!loadindCandidates && candidateLength !== 0 && (
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
                POSITION:{" "}
                <span className="text-3-span">{currentPosition?.position}</span>{" "}
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
                {currentPosition?.candidates &&
                  currentPosition?.candidates.map((candidate, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <Candidate
                        name={candidate.name}
                        candidateId={candidate.id}
                        positionId={currentPosition.position_id}
                        _selectedCandidate={currentPosition?.selectedCandidate}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              {currentIndex === 0 && (
                <button
                  className="next_button"
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                >
                  Next
                </button>
              )}
              {currentIndex > 0 && (
                <Stack
                  direction="row"
                  sx={{ width: "100%" }}
                  justifyContent="space-between"
                >
                  <button
                    className="previous_button"
                    onClick={() => handlePrevious()}
                  >
                    Previous
                  </button>
                  {currentIndex === candidateLength - 1 ? (
                    <button
                      className="next_button"
                      onClick={() => handleModal()}
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      className="next_button"
                      onClick={() => handleNext()}
                    >
                      Next
                    </button>
                  )}
                  {/* <button className="next_button" onClick={() => handleNext()}>
                    Next
                  </button> */}
                </Stack>
              )}
            </Box>
          </Stack>
        )}
        <BasicModal
          open={open}
          setOpen={setOpen}
          isSending={isSending}
          handleSubmit={handleSubmit}
        />
      </div>
    );
};

export default page;
