import { Box, useTheme, useMediaQuery, Typography } from '@mui/material'
import Form from './Form'
export default function Login() {
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  return (
    <Box>
      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form />
      </Box>
    </Box>
  )
}
