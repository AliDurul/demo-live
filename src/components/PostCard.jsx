import * as React from 'react'
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box, Skeleton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'



export const PostCard = ({ post, loading }) => {
    const [isLiked, setIsLiked] = React.useState(false)
    const handleLike = () => setIsLiked(!isLiked)

    if (loading) {
        return (
            <Card sx={{ mb: 3 }}>
                <CardHeader
                    avatar={<Skeleton variant="circular" width={40} height={40} />}
                    title={<Skeleton variant="text" width="60%" />}
                    subheader={<Skeleton variant="text" width="40%" />}
                />
                <Skeleton variant="rectangular" height={190} sx={{ mx: 2 }} />
                <CardContent>
                    <Skeleton variant="text" height={60} />
                </CardContent>
                <CardActions disableSpacing>
                    <Skeleton variant="rectangular" width={100} height={30} sx={{ m: 1 }} />
                    <Skeleton variant="rectangular" width={100} height={30} sx={{ m: 1 }} />
                </CardActions>
            </Card>
        )
    }

    return (
        <Card sx={{ mb: 3 }}>
            <CardHeader
                avatar={
                    <Avatar src={post.authorAvatar} sx={{ bgcolor: 'primary.main' }}>
                        {post.authorName.charAt(0)}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={<Typography variant="subtitle1" fontWeight="bold">{post.authorName}</Typography>}
                subheader={post.timestamp}
            />

            {/* Post Image (using Box to control aspect ratio and image fitting) */}
            <Box
                component="img"
                src={post.image}
                alt="Post visual"
                sx={{
                    width: '100%',
                    height: { xs: 200, sm: 350 },
                    objectFit: 'cover',
                    display: 'block',
                }}
            />

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={handleLike}>
                    <FavoriteIcon color={isLiked ? 'error' : 'inherit'} />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                    {isLiked ? post.likes + 1 : post.likes} likes
                </Typography>
            </CardActions>
        </Card>
    )
}