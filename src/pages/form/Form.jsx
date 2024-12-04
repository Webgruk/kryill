import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  dateOfBirth: yup.string().required('Required'),
  department: yup.string().required('Required'),
})

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: '',
  department: '',
}

function Form() {
  const { palette } = useTheme()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const navigate = useNavigate()

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/v1/users/add`,
        values,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      alert('User successfully added!')
      console.log('Server Response:', response.data)
      navigate('/table')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit the form. Please try again.')
    }
  }

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
            }}
          >
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              name="firstName"
              error={Boolean(touched.firstName) && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
              sx={{ gridColumn: 'span 2' }}
            />
            <TextField
              label="Last Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              name="lastName"
              error={Boolean(touched.lastName) && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
              sx={{ gridColumn: 'span 2' }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                sx={{ gridColumn: 'span 4' }}
                value={values.dateOfBirth ? dayjs(values.dateOfBirth) : null}
                onChange={(newValue) =>
                  setFieldValue('dateOfBirth', newValue?.format('YYYY-MM-DD'))
                }
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>

            <FormControl fullWidth sx={{ gridColumn: 'span 4' }}>
              <InputLabel id="department-select-label">Department</InputLabel>
              <Select
                labelId="department-select-label"
                id="department-select"
                value={values.department}
                onChange={(event) =>
                  setFieldValue('department', event.target.value)
                }
                error={
                  Boolean(touched.department) && Boolean(errors.department)
                }
              >
                <MenuItem value="HR">Human Resources</MenuItem>
                <MenuItem value="engineering">Engineering</MenuItem>
                <MenuItem value="logistics">Logistics</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form
