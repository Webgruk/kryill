import { useState } from 'react'
import { IconButton, Typography, useMediaQuery } from '@mui/material'
import { DarkMode, LightMode, Menu } from '@mui/icons-material'
import { Outlet, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setMode } from '../../States/index'
import FlexBetween from '../../components/FlexBetween'
import { useTheme } from '@mui/material/styles'

export default function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //   const user = useSelector((state) => state.user)
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)')

  const theme = useTheme()
  //   const [mode, setMode] = useState('dark')

  const neutalLight = theme.palette.neutral.light
  const dark = theme.palette.neutral.dark
  const background = theme.palette.background.default
  const primaryLight = theme.palette.neutral.main
  const alt = theme.palette.background.alt
  //   const fullName = `${user.firstName} ${user.lastName}`

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem,2rem,2.25rem)"
            color="primary"
            onClick={() => navigate('/home')}
            sx={{
              '&:hover': {
                cursor: 'pointer',
                color: primaryLight,
              },
            }}
          >
            Kryill
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: primaryLight,
                fontSize: '14px',
              }}
            >
              <h2>Add</h2>
            </Link>

            <Link
              to="/table"
              style={{
                textDecoration: 'none',
                color: primaryLight,
                fontSize: '14px',
              }}
            >
              <h2>Table</h2>
            </Link>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              ) : (
                <DarkMode sx={{ fontSize: '25px' }} />
              )}
            </IconButton>
            {/* <Message sx={{ fontSize: '25px' }} /> */}
            {/* <Notifications sx={{ fontSize: '25px' }} /> */}

            {/* <Help sx={{ fontSize: '25px' }} /> */}
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}
      </FlexBetween>

      <Outlet />
    </>
  )
}
