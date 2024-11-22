import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getUserById, updateUserById } from "../../Service/UserDetailsApi";
import { message } from "antd";

const MyProfile = ({ cusID, email }) => {
  const [editableName, setEditableName] = useState(null);
  const [userData, setUserData] = useState([])
  const [editableBillingAddress, setEditableBillingAddress] = useState(null);
  const [editablePhoneNumber, setEditablePhoneNumber] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dataLoading, setDataLoading] = useState(true);
  const fechUserData = async () => {
    const user = await getUserById(cusID);
    if (user?.id == cusID) {
      setUserData(user);
      setEditableBillingAddress(user.billingAddress)
      setEditableName(user.name)
      setEditablePhoneNumber(user.phoneNumber)
      setDataLoading(false)
    }
  }
  useEffect(() => {
    fechUserData()
  }, [cusID])

  const handleProfileUpdate = async () => {
    try {
      const data = {
        name: editableName,
        billingAddress: editableBillingAddress,
        phoneNumber: editablePhoneNumber,
      };


      const res = await updateUserById(cusID, data);

      if (res) {
        message.success("Update Successfully...");
        setIsEditDialogOpen(false);
        fechUserData()
      } else {
        message.error("Update failed...");
      }
    } catch (e) {
      message.error("Update failed...");
      console.error("Error during update:", e);
    }
  };



  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }
    console.log("Password updated:", { oldPassword, newPassword });
    setIsPasswordDialogOpen(false);
  };
  if (dataLoading) {
    return null
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "white",
          boxShadow: 4,
          borderRadius: "12px",
          position: "relative",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{ fontWeight: "bold", marginBottom: "2rem", textAlign: "center" }}
          >
            My Profile
          </Typography>

          <IconButton
            onClick={() => setIsEditDialogOpen(true)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "#f5f5f5",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            <EditIcon color="primary" />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Customer ID"
              variant="outlined"
              fullWidth
              value={cusID}
              disabled
              sx={{
                backgroundColor: "#f5f5f2",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&.Mui-disabled": {
                    color: "#F68714",
                    fontWeight: 900,
                  },
                },

              }}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              disabled
              sx={{
                backgroundColor: "#f5f5f2",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&.Mui-disabled": {
                    color: "#F68714",
                    fontWeight: 900,
                  },
                },

              }}
            />
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              disabled
              value={userData.name}
              sx={{
                backgroundColor: "#f5f5f2",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&.Mui-disabled": {
                    color: "#F68714",
                    fontWeight: 900,
                  },
                },

              }}
            />

            <TextField
              label="Billing Address"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={userData?.billingAddress}
              disabled
              sx={{
                backgroundColor: "#f5f5f2",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&.Mui-disabled": {
                    color: "#F68714",
                    fontWeight: 900,
                  },
                },

              }}
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={userData?.phoneNumber}
              disabled
              sx={{
                backgroundColor: "#f5f5f2",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "&.Mui-disabled": {
                    color: "#F68714",
                    fontWeight: 900,
                  },
                },

              }}
            />
          </Box>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsPasswordDialogOpen(true)}
            sx={{
              width: "100%",
              padding: "12px 0",
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              marginTop: "2rem",
              "&:hover": { backgroundColor: "#F68714", color: "white" },
            }}
          >
            Change Password
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <br />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={editableName}
            onChange={(e) => setEditableName(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Billing Address"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={editableBillingAddress}
            onChange={(e) => setEditableBillingAddress(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={editablePhoneNumber}
            onChange={(e) => setEditablePhoneNumber(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleProfileUpdate} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Old Password"
            variant="outlined"
            fullWidth
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPasswordDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handlePasswordUpdate} color="primary">
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyProfile;
