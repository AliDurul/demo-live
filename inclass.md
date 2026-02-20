- app
```jsx
import { useMemo, useState } from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { getDesignTokens, ColorModeContext } from './lib/theme-config'
import Home from './pages/Home'


export default function App() {
  const [mode, setMode] = useState('dark')

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
    },
  }), [])

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
```

-home
```jsx
import { Box, Button } from '@mui/material'
import ThemeToggle from '../components/ThemeToggle'


export default function Home() {

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                transition: 'background-color 0.3s ease-in-out',
                color: 'text.primary',
            }}
        >
            <ThemeToggle />
            <Box
                sx={{
                    p: 4,
                    textAlign: 'center',
                    '& > button': {
                        mr: 2,
                    },
                }}
            >
                <Button variant="contained">Hello world (Primary)</Button>
                <Button variant="contained" color="secondary">Secondary Button</Button>
            </Box>
        </Box>
    )
}
```

- toggle
```jsx
import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from '../lib/theme-config'

export default function ThemeToggle() {
    const theme = useTheme()
    const colorMode = React.useContext(ColorModeContext)

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'flex-end',
                p: 2,
            }}
        >
            <IconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
                aria-label={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    )
}
```