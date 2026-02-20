import * as React from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Paper, Typography, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import SettingsIcon from '@mui/icons-material/Settings'
import ChatIcon from '@mui/icons-material/Chat'
import { Link, useLocation } from 'react-router-dom'


export default function Sidebar({ onLinkClick }) {
  const location = useLocation()
  const theme = useTheme()
  
  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Friends', icon: <PeopleIcon />, path: '/friends' },
    { text: 'Messages', icon: <ChatIcon />, path: '/messages' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ]

    return (
    //   sx={{ p: 2, height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}
    <Paper elevation={3} sx={{ p: 2, height: 'calc(100vh - 85px)', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
        App Menu
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.text} 
            disablePadding
            sx={{
              borderRadius: theme.shape.borderRadius,
              backgroundColor: location.pathname === item.path ? theme.palette.action.selected : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname === item.path ? theme.palette.action.selected : theme.palette.action.hover,
              },
            }}
          >
            <ListItemButton component={Link} to={item.path} onClick={onLinkClick} >
              <ListItemIcon sx={{ color: location.pathname === item.path ? theme.palette.primary.main : 'inherit', minWidth: 45 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} /> {/* Spacer for pushing content down */}
      <Divider sx={{ mt: 2 }} />
      <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 2 }}>
        © 2026 Sth Social
      </Typography>
    </Paper>
  )
}