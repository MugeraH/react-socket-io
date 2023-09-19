import * as React from "react";
import { Box, Typography, Badge, Menu, MenuItem, Button } from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

function Navabar({ socket }) {
  const [notifications, setNotifications] = React.useState([]);
  const [texts, setTexts] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  React.useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  const displayNotification = ({ senderName, type }) => {
    let action;
    if (type === 1) {
      action = "liked";
    }
    if (type === 2) {
      action = "commented";
    }
    if (type === 3) {
      action = "shared";
    }
    return <Typography> {`${senderName} ${action} your post`}</Typography>;
  };

  const handleRead = () => {
    setNotifications([]);
    handleClose();
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "500px",
        alignItems: "center",
        padding: " 20px ",
        background: "#51a3a2",
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="#fff">
        Wozaa
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon
            sx={{ color: "#fff" }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
        </Badge>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ width: "500px" }}
        >
          {notifications.map((n, index) => (
            <MenuItem key={index}>{displayNotification(n)} </MenuItem>
          ))}

          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ margin: "10px 10px" }}
            onClick={handleRead}
          >
            {" "}
            Mark as read
          </Button>
        </Menu>

        <Badge badgeContent={0} color="error">
          <EmailIcon sx={{ color: "#fff" }} />
        </Badge>

        <Badge badgeContent={0} color="error">
          <SettingsIcon sx={{ color: "#fff" }} />
        </Badge>
      </Box>
    </Box>
  );
}

export default Navabar;
