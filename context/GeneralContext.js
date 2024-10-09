"use client";

import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [active, setActive] = useState("");
  const [token, setToken] = useState();
  const URL = "https://futo-sug-backend.onrender.com/api/v1";
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [pollId, setPollId] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loadindCandidates, setLoadingCandidates] = useState([]);

  useEffect(() => {
    setAuthLoading(true);
    const authToken = localStorage.getItem("authToken");
    setToken(authToken);
    setAuthLoading(false);
  }, [token]);

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          console.log("fetching poll");
          const { data } = await axios.get(`${URL}/poll`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPollId(data?.payload?.id);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [token]);

  useEffect(() => {
    if (pollId)
      (async () => {
        setLoadingCandidates(true);
        try {
          const { data } = await axios.get(`${URL}/positions`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          handleFetchCandidates(data?.payload);
          setLoadingCandidates(false);
        } catch (error) {
          console.log(error);
          setLoadingCandidates(false);
        }
      })();
  }, [pollId]);

  const handleFetchCandidates = async (positions) => {
    console.log("fetching candidates");
    try {
      const candidates = await Promise.all(
        positions.map(async (position) => {
          const { data } = await axios.get(
            `${URL}/candidates?poll_id=${pollId}&position_id=${position?.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return {
            position: position.name,
            candidates: data?.payload,
          };
        })
      );
      console.log("All Candidates", candidates);
      setCandidates(candidates);
    } catch (error) {
      console.log("Error fetching candidates:", error);
    }
  };

  return (
    <GeneralContext.Provider
      value={{
        active,
        setActive,
        loading,
        setLoading,
        URL,
        active,
        setActive,
        token,
        setToken,
        authLoading,
        pollId,
        setPollId,
        candidates,
        setCandidates,
        loadindCandidates,
        setLoadingCandidates,
      }}
    >
      {children}
      <ToastContainer />
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
