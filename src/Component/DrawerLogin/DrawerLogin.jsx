import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import logo from "../../assets/Logo/logo.png";
import { message } from "antd";
import { registerApi } from "../../Service/RegisterApi";
import { LoginApi } from "../../Service/LoginApi";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
export default function LoginDrawer() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    roles: "",
  });
  const [errors, setErrors] = React.useState({});
  const { login } = useUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, password, confirmPassword } = formData;

    if (isSignUp) {
      if (!name) newErrors.name = "Name is required";
    }
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) {
      newErrors.password = "Password should be at least 8 characters";
    }
    if (isSignUp && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!isSignUp) {
        const loginDetails = {
          email: formData.email,
          password: formData.password,
        };
        const response = await LoginApi(loginDetails);
        if (response?.status === "success") {
          message.success(response?.message);
          login(response?.data?.role);
          if (response?.data?.role == "admin") {
            await localStorage.setItem("token", response?.data?.jwtToken)
            navigate("/admin");

          } else if (response?.data?.role == "customer") {
            await localStorage.setItem("token", response?.data?.jwtToken)
            navigate("/user/");
          }

          setFormData({ password: "", email: "" });
        } else {
          message.error(response?.message);
        }
      } else {
        const dataToSubmit = {
          ...formData,
          role: "customer",
        };
        delete dataToSubmit.confirmPassword;
        const response = await registerApi(dataToSubmit);
        if (response?.status === "Success") {
          message.success(response.message);
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          toggleDrawer(false);
        } else {
          message.error(response.message);
        }
      }
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleToggleForm = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
  };

  const LoginForm = (
    <Box sx={{ maxWidth: 400, padding: 2 }} role="presentation">
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
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <Divider />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
        {isSignUp && (
          <TextField
            required
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            type="text"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
        )}
        <TextField
          required
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          type="email"
          name="email"
          onChange={handleInputChange}
          value={formData.email}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <TextField
          required
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          name="password"
          onChange={handleInputChange}
          value={formData.password}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
        {isSignUp && (
          <TextField
            required
            fullWidth
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
            value={formData.confirmPassword}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          type="submit"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
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
            Don't have an account?{" "}
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
            message.info("Forgot password functionality to be implemented.")
          }
        >
          Forgot password?
        </Typography>
      </Box>
    </Box>
  );

  return (
    <div>
      <LoginIcon
        className="text-white fw-bolder"
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
