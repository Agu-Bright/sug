"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Alert, IconButton, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { GeneralContext } from "@/context/GeneralContext";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify"; // Import the Bounce transition if it's provided by your toast library
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function BasicModal({ open, setOpen }) {
  //   const handleOpen = () => setOpen(true);
  const router = useRouter();
  const handleClose = () => setOpen(false);
  const { candidates, URL, token } = React.useContext(GeneralContext);
  const [isSending, setIsSending] = React.useState(false);

  const handleSubmit = async () => {
    const _votes = candidates.map((item) => {
      return {
        position_id: item.position_id,
        candidate_id: item.selectedCandidate,
      };
    });
    try {
      setIsSending(true);
      await axios.post(
        `${URL}/vote`,
        {
          votes: _votes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //success message
      //logout
      setIsSending(false);
      localStorage.removeItem("authToken");
      router.push("/success");
    } catch (error) {
      setIsSending(false);
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
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ marginBottom: "20px" }}
          >
            <div></div>
            <IconButton onClick={() => handleClose()}>
              <ClearIcon sx={{ color: "red" }} />
            </IconButton>
          </Stack>
          <Alert severity="warning">Are you sure you want to submit</Alert>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            You won't be able to change submission{" "}
          </Typography>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <button
              onClick={() => handleSubmit()}
              style={{
                color: "white",
                background: "#4D8E2D",
                width: "65%",
                padding: "15px 0px",
                borderRadius: "10px",
              }}
            >
              {isSending ? (
                <CircularProgress sx={{ color: "white" }} size={15} />
              ) : (
                "Yes"
              )}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
