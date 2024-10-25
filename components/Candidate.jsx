"use client";
import { GeneralContext } from "@/context/GeneralContext";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Candidate = ({ name, positionId, candidateId, _selectedCandidate }) => {
  const { setSelectedCandidate, candidates, setCandidates } =
    useContext(GeneralContext);

  const handleCastVote = (_name) => {
    setSelectedCandidate(_name);
    setCandidates((prev) => {
      return prev.map((item) => {
        if (item.position_id === positionId) {
          return {
            ...item,
            selectedCandidate: candidateId,
          };
        }
        return item;
      });
    });
    console.log("updatedCandidates", candidates);
    toast.success("Voted", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <Stack
      onClick={() => handleCastVote(name)}
      direction="row"
      sx={{
        border: `${
          _selectedCandidate === candidateId ? "2px solid white" : ""
        }`,
        background: `${
          _selectedCandidate === candidateId
            ? "linear-gradient( 90deg, rgba(18, 117, 1, 0.98) 0%, rgba(32, 205, 2, 0.98) 100%)"
            : "white"
        }`,

        width: "100%",
        borderRadius: "5px",
        padding: "8px",
        cursor: "pointer",
      }}
    >
      <Box sx={{ width: "20%", height: "auto" }}>
        <Avatar
          // src="/img/avatar.jpeg"
          sx={{ width: "auto", height: "100%", borderRadius: "5px" }}
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
        <Typography
          sx={{
            width: "100%",
            fontWeight: "700",
            color: `${_selectedCandidate === candidateId ? "white" : "black"}`,
          }}
        >
          {name}
        </Typography>
      </Box>
    </Stack>
  );
};

export default Candidate;
