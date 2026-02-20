import * as React from 'react'
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper, Card, CardHeader, CardContent } from '@mui/material'
import { faker } from '@faker-js/faker'
import OnlineFriends from './OnlineFriends'

// Mock data for messages and posts
const mockMessages = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    name: faker.person.firstName(),
    message: faker.lorem.sentence(3),
    time: `${faker.number.int({ min: 1, max: 59 })}m ago`,
}))

const mockLatestPosts = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    title: faker.lorem.sentence(4),
    author: faker.person.fullName(),
}))


export default function RightSidebar() {
    return (
        <Box>
            <OnlineFriends />

            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Recent Messages
                </Typography>
                <List dense disablePadding>
                    {mockMessages.map((msg) => (
                        <React.Fragment key={msg.id}>
                            <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                                <ListItemAvatar>
                                    <Avatar src={faker.image.avatar()} sx={{ width: 32, height: 32 }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="body2" component="span" fontWeight="bold">{msg.name}</Typography>}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {msg.message}
                                            </Typography>
                                            {' — ' + msg.time}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            <Card elevation={3}>
                <CardHeader
                    title={<Typography variant="h6">Latest Posts</Typography>}
                    sx={{ pb: 0 }}
                />
                <CardContent sx={{ pt: 1 }}>
                    <List dense disablePadding>
                        {mockLatestPosts.map((post) => (
                            <ListItem key={post.id} disablePadding sx={{ py: 0.5 }}>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {post.title}
                                        </Typography>
                                    }
                                    secondary={`by ${post.author}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Box>
    )
}