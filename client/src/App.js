import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import "./App.css";
import Navabar from "./components/Navabar/Navabar";
import Card from "./components/Card/Card";
import { io } from "socket.io-client";
import { posts } from "./data";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  React.useEffect(() => {
    // const socket = ;

    setSocket(io("http://localhost:5500"));

    // socket.on("firstEvent", (msg) => {
    //   console.log(msg);

    //   // update my ui
    // });
  }, []);

  React.useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <Box sx={{ border: "2px solid #51a3a2" }}>
          <Navabar socket={socket} />
          {posts.map((post, index) => (
            <Card key={index} post={post} socket={socket} user={user} />
          ))}

          <Typography
            variant="h5"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "green",
              textTransform: "capitalize",
            }}
          >
            {user}
          </Typography>
        </Box>
      ) : (
        <div className="login">
          <TextField
            label="username"
            type="text"
            sx={{ margin: "10px", width: "300px" }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setUser(username);
            }}
          >
            {" "}
            Login
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
