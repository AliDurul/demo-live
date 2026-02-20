import * as React from 'react'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { faker } from '@faker-js/faker'
import { PostCard } from '../components/PostCard'
import RightSidebar from '../components/RightSidebar'

// Mock function to generate a single post
const generatePost = (id) => ({
  id: id.toString(),
  authorName: faker.person.fullName(),
  authorAvatar: faker.image.avatar(),
  timestamp: faker.date.recent().toLocaleDateString(),
  content: faker.lorem.paragraph(5),
  image: `https://picsum.photos/600/400?random=${id}`,
  likes: faker.number.int({ min: 10, max: 500 }),
})

// Generate 10 mock posts
const mockPosts = Array.from({ length: 10 }, (_, i) => generatePost(i + 1))


export default function Feed() {
  const [loading, setLoading] = React.useState(true)
  const theme = useTheme()

  React.useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const loadingPosts = Array.from({ length: 3 }, (_, i) => (
    <PostCard key={i} post={{}} loading={true} />
  ))

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, lg: 8 }}>
        <Box>
          {loading ? loadingPosts : mockPosts.map((post) => (
            <PostCard key={post.id} post={post} loading={false} />
          ))}
        </Box>
      </Grid>
      {/* Right Sidebar (Desktop Large View) */}
      <Grid size={{ lg: 4 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
        <Box position="sticky" top={theme.spacing(10)}>
          <RightSidebar />
        </Box>
      </Grid>
    </Grid>
  )
}