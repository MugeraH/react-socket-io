import { Box, Typography, IconButton, Avatar } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InfoIcon from "@mui/icons-material/Info";

function Card({ post, socket, user }) {
  const [liked, setLiked] = React.useState(false);

  const handleNotification = (type) => {
    if (type === 1) {
      setLiked(true);
    }
    if (socket) {
      socket.emit("sendNotification", {
        senderName: user,
        receiverName: post.username,
        type,
      });
    }
  };

  return (
    <Box my={2}>
      <Box
        my={1}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          padding: "2px 10px",
        }}
      >
        <IconButton sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src={`${post.userImg}`} />
        </IconButton>
        <Typography fontWeight={600}>{post.fullname}</Typography>
      </Box>

      <Box
        component="img"
        width="100%"
        height="250px"
        overflow="hidden"
        sx={(theme) => ({
          objectFit: "cover",
          borderBottomLeftRadius: "1%",
          borderBottomRightRadius: "1%",
          opacity: "0.8",
        })}
        alt="background image"
        src={`${post.postImg}`}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {liked ? (
            <FavoriteIcon
              sx={{ color: "red", fontSize: "27px" }}
              // onClick={() => setLiked(!liked)}
            />
          ) : (
            <FavoriteBorderIcon
              sx={{ color: "grey", fontSize: "27px" }}
              onClick={() => {
                handleNotification(1);
              }}
            />
          )}
          <ChatBubbleOutlineIcon
            sx={{ color: "grey", fontSize: "27px" }}
            onClick={() => {
              handleNotification(2);
            }}
          />
          <OpenInNewIcon
            sx={{ color: "grey", fontSize: "27px" }}
            onClick={() => {
              handleNotification(3);
            }}
          />
        </Box>{" "}
        <Box>
          <InfoIcon sx={{ color: "grey", fontSize: "27px" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default Card;
