import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/500.css';        // Peso 400 (regular)
import '@fontsource/open-sans/600.css'; // Peso 600 (semibold)
import '@fontsource/open-sans/700.css'; // Peso 700 (bold)

import './index.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import type {} from '@mui/x-data-grid/themeAugmentation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',       // Primary
      dark: '#00796B',       // Dark Primary
      light: '#E1EBEA',      // Light Primary
      contrastText: '#000000' // Texto sobre primary
    },
    secondary: {
      main: '#FF5252',       // Accent
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#FFFFFF'     // Background
    },
    text: {
      primary: '#000000',    // Primary Text
      secondary: '#4D4D4D'   // Secondary Text
    },
    divider: '#BDBDBD'       // Divider
  },

  typography: {
    fontFamily: [
      '"Open Sans"'
    ].join(','),
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    button: {
      textTransform: 'none', // Opcional: quita mayúsculas en botones
      fontWeight: 600
    }
  },
  
// El tema del datagrid
  components:{
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#E1EBEA', // primary.light
            color: '#00796B', // primary.dark
            fontSize: '0.875rem',
            fontWeight: 600
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid #BDBDBD`, // divider
            color: '#4D4D4D', // text.secondary
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 'none'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: `1px solid #BDBDBD`, // divider
            backgroundColor: '#E1EBEA' // primary.light
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(0, 150, 136, 0.08)' // primary.main con opacidad
          }
        }
      }
    }
  }
});



createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
