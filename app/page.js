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
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GeneralContext } from "@/context/GeneralContext";
export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { URL, loading, setLoading } = useContext(GeneralContext);

  const handleLogin = async () => {
    if (!userName || !password) {
      console.log("hii");
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

            <Box sx={{ height: "20%" }}>
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
            <Stack
              sx={{ height: "50%" }}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input_style"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <label>password</label>
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
