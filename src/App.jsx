// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from 'react-router-dom'
// import Home from './pages/homepage/Home'
// import { ThemeProvider, createTheme } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'
// import { useSelector } from 'react-redux'
// import { themeSettings } from './theme'
// import { useMemo } from 'react'
// import FormContainer from './pages/form/FormContainer'
// import Tables from './pages/table/Table'

// function App() {
//   const mode = useSelector((state) => state.auth.mode)

//   const theme = useMemo(() => createTheme(themeSettings(mode), [mode]))

//   // Set up routing with paths for each component
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Home />}>
//         <Route path="form" element={<FormContainer />} />
//         <Route path="tables" element={<Tables />} />
//       </Route>,
//     ),
//   )

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <RouterProvider router={router} />
//     </ThemeProvider>
//   )
// }

// export default App

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Home from './pages/homepage/Home'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useSelector } from 'react-redux'
import { themeSettings } from './theme'
import { useMemo } from 'react'
import FormContainer from './pages/form/FormContainer'
import Tables from './pages/table/Table'
import FormEdit from './pages/edit/FormEdit'

function App() {
  const mode = useSelector((state) => state.auth.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          index: true,
          element: <FormContainer />,
        },
        {
          path: 'table',
          element: <Tables />,
        },
        {
          path: 'edit-form/:id', // Route with a parameter for the edit form
          element: <FormEdit />, // Component to render when visiting this route
        },
      ],
    },
  ])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
