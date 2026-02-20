import * as React from 'react'
import { Box, Typography, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, TextField, Button, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { faker } from '@faker-js/faker'

// Mock chat messages
const mockMessages = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  sender: i % 3 === 0 ? 'Me' : faker.person.firstName(),
  message: faker.lorem.sentences(faker.number.int({ min: 1, max: 3 })),
  avatar: faker.image.avatar(),
  isMe: i % 3 === 0,
}))

export default function Messages() {
  const [input, setInput] = React.useState('')
  const messagesEndRef = React.useRef(null)

  const handleSend = () => {
    if (input.trim() !== '') {
      // In a real app, you would send the message here.
      console.log(`Sending message: ${input}`)
      setInput('')
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  React.useEffect(scrollToBottom, [mockMessages.length])
  
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Direct Messages
      </Typography>

      <Paper 
        elevation={3} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: 'calc(100vh - 180px)', // Fixed height for chat window
          minHeight: 400,
        }}
      >
        {/* Chat Message List */}
        <List sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {mockMessages.map((msg) => (
            <ListItem 
              key={msg.id} 
              sx={{ 
                justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                pl: msg.isMe ? 5 : 0, 
                pr: msg.isMe ? 0 : 5,
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  flexDirection: msg.isMe ? 'row-reverse' : 'row',
                  maxWidth: '70%',
                }}
              >
                <ListItemAvatar sx={{ minWidth: 40, ml: msg.isMe ? 1 : 0, mr: msg.isMe ? 0 : 1 }}>
                  <Avatar src={msg.avatar} alt={msg.sender}>
                    {msg.sender.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Paper 
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        borderRadius: 3,
                        borderTopRightRadius: msg.isMe ? 0 : 3,
                        borderTopLeftRadius: msg.isMe ? 3 : 0,
                        bgcolor: msg.isMe ? 'primary.main' : 'background.default',
                        color: msg.isMe ? 'white' : 'text.primary',
                        maxWidth: '100%',
                        wordWrap: 'break-word',
                      }}
                    >
                      <Typography variant="caption" sx={{ display: 'block', fontWeight: 'bold', mb: 0.5 }}>
                        {msg.sender}
                      </Typography>
                      <Typography variant="body2">{msg.message}</Typography>
                    </Paper>
                  }
                  sx={{ my: 0 }}
                />
              </Box>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>

        {/* Message Input Area */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Write a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              />
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSend} 
                endIcon={<SendIcon />}
                disabled={!input.trim()}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}