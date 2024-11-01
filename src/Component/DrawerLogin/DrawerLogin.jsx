import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { UserOutlined } from "@ant-design/icons";
import logo from "../../assets/Logo/logo.png";
export default function LoginDrawer() {
  const [open, setOpen] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false); // State to toggle between login and sign-up forms

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleToggleForm = () => {
    setIsSignUp((prev) => !prev); // Toggle between login and sign-up forms
  };

  const LoginForm = (
    <Box sx={{ maxWidth: 400, padding: 2  }} role="presentation">
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>

      <Typography variant="h6" gutterBottom className="fw-bold">
        {isSignUp ? "Sign Up" : "Login"}
      </Typography>
      <div
        className="log"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          backgroundImage: `url(${logo})`, // Assuming 'logo' is a valid image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <Divider />
      <Box component="form" sx={{ mt: 0 }}>
        {isSignUp ? (
          <>
            <TextField
              required
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              type="text"
            />
            <TextField
              required
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
            />
            <TextField
              required
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
            />
            <TextField
              required
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <TextField
              required
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
            />
            <TextField
              required
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        {isSignUp ? (
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "black" }}
          >
            Already have an account?{" "}
            <Typography
              component="span"
              sx={{ cursor: "pointer", color: "blue" }}
              onClick={handleToggleForm}
            >
              Login
            </Typography>
          </Typography>
        ) : (
          <Typography
            variant="body2"
            sx={{ cursor: "pointer", color: "black" }}
          >
            Don't you have an account?{" "}
            <Typography
              component="span"
              sx={{ cursor: "pointer", color: "blue" }}
              onClick={handleToggleForm}
            >
              Sign Up
            </Typography>
          </Typography>
        )}
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", color: "black" }}
          onClick={() =>
            alert("Forgot password functionality to be implemented.")
          }
        >
          Forgot password?
        </Typography>
      </Box>
    </Box>
  );

  return (
    <div>
      <UserOutlined
        onClick={toggleDrawer(true)}
        style={{ fontSize: "20px", cursor: "pointer" }}
      />
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        style={{ width: "75%" }}
      >
        {LoginForm}
      </Drawer>
    </div>
  );
}
