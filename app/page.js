"use client";
import {
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import "./login.css";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GeneralContext } from "@/context/GeneralContext";
export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { URL, loading, setLoading, token, setToken, authLoading } =
    useContext(GeneralContext);

  const handleLogin = async () => {
    if (!userName || !password) {
      toast.error("InComplete Credentials", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${URL}/ticket/login`, {
        username: userName,
        password,
      });
      localStorage.setItem("authToken", data?.payload?.token);
      setToken(data?.payload?.token);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/candidates");
    }
  }, token);

  if (authLoading) {
    return (
      <div style={{ width: "100%", height: "100vh" }}>
        <CircularProgress sx={{ color: "green" }} />
      </div>
    );
  }

  if (!token)
    return (
      <div className="login">
        <Box
          className="login-box"
          sx={{ width: { md: "45%", xs: "90%" }, height: "80%" }}
        >
          <Box
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{ height: "80%", width: "80%" }}
            >
              <Box
                sx={{
                  height: "20%",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0px 20px",
                }}
              >
                <Avatar
                  src="/img/futo.jpeg"
                  alt="futo_logo"
                  sx={{ borderRadius: "5px", height: "100%", width: "auto" }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    height: "20%",
                    width: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: "center",
                      fontWeight: "700",
                      fontSize: "30px",
                    }}
                    className="gradient-text"
                  >
                    STUDENT UNION GOVERNMENT
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      fontSize: "15px",
                      fontWeight: "700",
                    }}
                  >
                    ELECTION 2024
                  </Typography>
                </Box>
              </Box>
              <Stack
                sx={{ height: "50%" }}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input_style"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "10px",
                  }}
                >
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input_style"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Box>
                <button
                  className="login_button"
                  onClick={() => !loading && handleLogin()}
                >
                  {loading ? (
                    <CircularProgress size={15} sx={{ color: "white" }} />
                  ) : (
                    "Login"
                  )}
                </button>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </div>
    );
}
