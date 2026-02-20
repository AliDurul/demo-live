import * as React from 'react'


export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
               
                primary: {
                    main: '#4a148c',
                },
                secondary: {
                    main: '#ff6f00',
                },
                background: {
                    default: '#f4f6f8',
                    paper: '#ffffff',
                },
            }
            : {
                primary: {
                    main: '#ce93d8',
                },
                secondary: {
                    main: '#ffb74d',
                },
                background: {
                    default: '#1a1a2e',
                    paper: '#2c2c45',
                },
            }),
    },
})


export const ColorModeContext = React.createContext({ toggleColorMode: () => { } })