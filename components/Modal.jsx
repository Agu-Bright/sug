import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, Alert, IconButton, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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

export default function BasicModal({ open, setOpen, isSending, handleSubmit }) {
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
              //   onClick={() => !isSending && handleSubmit()}
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
