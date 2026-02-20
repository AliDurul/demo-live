import * as React from 'react'
import { Box, Typography, Card, CardContent, CardMedia, Avatar, Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { faker } from '@faker-js/faker'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import EmailIcon from '@mui/icons-material/Email'
import CakeIcon from '@mui/icons-material/Cake'

const mockUser = {
  name: 'Jane Doe',
  username: '@janedoe',
  bio: faker.lorem.paragraph(3),
  location: 'San Francisco, CA',
  email: 'jane@example.com',
  dob: 'October 25th, 1995',
  followers: '1.2k',
  following: 350,
  avatar: faker.image.avatar(),
  coverImage: 'https://images.pexels.com/photos/1037996/pexels-photo-1037996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
}


export default function Profile() {
  return (
    <Card sx={{ maxWidth: '100%', mb: 3, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={mockUser.coverImage}
        alt="Profile cover"
        sx={{ objectFit: 'cover' }}
      />
      <Box sx={{ p: 3, mt: -10 }}>
        <Avatar 
          src={mockUser.avatar} 
          alt={mockUser.name} 
          sx={{ 
            width: 100, 
            height: 100, 
            border: '4px solid', 
            borderColor: 'background.paper', 
          }} 
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -4 }}>
          <Button variant="outlined" sx={{ mr: 1 }}>
            Follow
          </Button>
          <Button variant="contained">
            Message
          </Button>
        </Box>

        <Typography variant="h4" component="div" sx={{ mt: 1, fontWeight: 'bold' }}>
          {mockUser.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {mockUser.username}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          {mockUser.bio}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <List disablePadding dense>
          <ListItem disableGutters>
            <ListItemIcon><LocationOnIcon color="action" /></ListItemIcon>
            <ListItemText primary={mockUser.location} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon><EmailIcon color="action" /></ListItemIcon>
            <ListItemText primary={mockUser.email} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon><CakeIcon color="action" /></ListItemIcon>
            <ListItemText primary={`Born: ${mockUser.dob}`} />
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Typography variant="h6">
            <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{mockUser.followers}</Box> Followers
          </Typography>
          <Typography variant="h6">
            <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>{mockUser.following}</Box> Following
          </Typography>
        </Box>

      </Box>
    </Card>
  )
}