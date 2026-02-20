import { Box, Typography, Avatar, Tooltip, AvatarGroup, Paper } from '@mui/material'
import { faker } from '@faker-js/faker'

const mockOnlineFriends = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    name: faker.person.firstName(),
    avatar: faker.image.avatar(),
}))


export default function OnlineFriends() {
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Online Friends
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                <AvatarGroup max={6}>
                    {mockOnlineFriends.map((friend) => (
                        <Tooltip title={friend.name} key={friend.id}>
                            <Avatar
                                alt={friend.name}
                                src={friend.avatar}
                                sx={{
                                    width: 40,
                                    height: 40,
                                    border: '3px solid',
                                    borderColor: 'success.main',
                                }}
                            />
                        </Tooltip>
                    ))}
                </AvatarGroup>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                {mockOnlineFriends.length} friends currently online.
            </Typography>
        </Paper>
    )
}