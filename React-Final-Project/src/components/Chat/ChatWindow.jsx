import React, { useContext, useEffect, useRef } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UserContext from "../../contexts/UserContext";
import ColorContext from "../../contexts/ColorContext";

const ChatWindow = ({ id, selectedChat, messagesByChat, input, setInput, sendMessage }) => {
console.log(messagesByChat);
  const {userData} = useContext(UserContext)
  const {color} = useContext(ColorContext)

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesByChat[id]]);
  
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        height: {xs:'50vh' , sm:"100vh"},
        overflow: "scroll",
        backgroundColor:'#EFEAE2'
        
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          // overflowY: "auto",
          marginBottom: "16px",
          // maxHeight: "calc(100vh - 120px)",
          padding:'12px'
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', width: '100%', flexWrap: 'wrap' }}>
          {selectedChat?.messages?.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                width: 'fit-content',
                marginLeft: msg.sender === userData._id ? 'auto' : 'unset',
                marginRight: msg.sender === userData._id ? 'unset' : 'auto',
                marginBottom: '8px',
                position: 'relative',
                backgroundColor: msg.sender === userData._id ? "#D9FDD3" : "#FFFFFF",
                padding: '10px',
                borderRadius: '10px',
                border: `1px solid ${msg.sender === userData._id ? "#D9FDD3" : "#D9D9D9"}`,
                display:'flex',
                alignItems:'center'
              }}
            >
              <ListItemAvatar>
              <Avatar src={selectedChat?.participants[1]?._id === msg.sender ? selectedChat?.participants[1]?.imageUrl.images[0] : selectedChat?.participants[0]?.imageUrl.images[0]} />
              </ListItemAvatar>
              <ListItemText
                primary={msg.sender.firstName}
                secondary={msg.content}
                sx={{ textAlign: msg.sender === userData._id ? 'right' : 'left' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: msg.sender === userData._id ? "#D9FDD3" : "#FFFFFF",
                  bottom: '-5px',
                  [msg.sender === userData._id ? 'left' : 'right']: '5px',
                  transform: msg.sender === userData._id ? 'rotate(45deg)' : 'rotate(-135deg)',
                }}
              />
            </ListItem>
          ))}
          {messagesByChat[id]?.map((msg, index) => (
            <ListItem
              key={index}
              alignItems={msg.sender === userData._id ? "flex-end" : "flex-start"}
              sx={{
                width: 'fit-content',
                marginLeft: msg.sender === userData._id ? 'auto' : 'unset',
                marginRight: msg.sender === userData._id ? 'unset' : 'auto',
                marginBottom: '8px',
                position: 'relative',
                backgroundColor: msg.sender === userData._id ? "#D9FDD3" : "#FFFFFF",
                padding: '10px',
                borderRadius: '10px',
                border: `1px solid ${msg.sender === userData._id ? "#D9FDD3" : "#D9D9D9"}`,
                display:'flex',
                alignItems:'center'
              }}
            >
              <ListItemAvatar>
              <Avatar src={selectedChat?.participants[1]._id === msg.sender ? selectedChat?.participants[1]?.imageUrl.images[0] : selectedChat?.participants[0]?.imageUrl.images[0]} />
              </ListItemAvatar>
              <ListItemText
                primary={msg.sender === userData._id ? userData.firstName : msg.sender.firstName}
                secondary={msg.content}
                sx={{ textAlign: msg.sender === userData._id ? 'right' : 'left' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: msg.sender === userData._id ? "#D9FDD3" : "#FFFFFF",
                  bottom: '-5px',
                  [msg.sender === userData._id ? 'left' : 'right']: '5px',
                  transform: msg.sender === userData._id ? 'rotate(45deg)' : 'rotate(-135deg)',
                }}
              />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
  fullWidth
  variant="outlined"
  placeholder="Type a message"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") sendMessage();
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', 
      },
      '&:hover fieldset': {
        borderColor: '#999', 
      },
      '&.Mui-focused fieldset': {
        borderColor: color, 
      },
    },
  }}
/>

        <IconButton sx={{color:color}} onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatWindow;
