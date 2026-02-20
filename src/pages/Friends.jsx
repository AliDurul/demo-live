import * as React from 'react'
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, CardActions } from '@mui/material'
import { faker } from '@faker-js/faker'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const generateFriend = (id) => ({
  id,
  name: faker.person.fullName(),
  jobTitle: faker.person.jobTitle(),
  avatar: faker.image.avatar(),
  isFollowing: faker.datatype.boolean(),
})

const mockFriends = Array.from({ length: 12 }, (_, i) => generateFriend(i + 1))


export default function Friends() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        My Friends ({mockFriends.length})
      </Typography>
      <Grid container spacing={3}>
        {mockFriends.map((friend) => (
          <Grid item xs={12} sm={6} md={4} key={friend.id}>
            <Card sx={{ textAlign: 'center', p: 2, height: '100%' }}>
              <Avatar 
                src={friend.avatar} 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mx: 'auto', 
                  mb: 2, 
                  bgcolor: 'secondary.main', 
                }} 
              >
                {friend.name.charAt(0)}
              </Avatar>
              <CardContent sx={{ pb: 0 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  {friend.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {friend.jobTitle}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pt: 2 }}>
                <Button 
                  size="small" 
                  variant={friend.isFollowing ? 'outlined' : 'contained'} 
                  startIcon={<PersonAddIcon />}
                >
                  {friend.isFollowing ? 'Following' : 'Add Friend'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}