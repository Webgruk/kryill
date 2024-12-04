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
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  dateOfBirth: yup.string().required('Required'),
  department: yup.string().required('Required'),
})

function FormEdit() {
  const { palette } = useTheme()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const navigate = useNavigate()
  const { id: userId } = useParams()
  const [data, setData] = useState({})
  const [, setError] = useState(null)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/v1/users/find?userId=${userId}`,
        )
        setData(response.data.data || {})
      } catch (error) {
        setError('Error fetching data')
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [userId])

  const initialValuesRegister = {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    dateOfBirth: data?.dateOfBirth || '',
    department: data?.department || '',
  }

  const handleFormSubmit = async (values) => {
    const obj = {
      ...values,
      userId,
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/v1/users/update`,
        obj,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      alert('User successfully updated!')
      console.log('Server Response:', response.data)
      navigate('/table')
      console.log(obj)
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Failed to update the user. Please try again.')
    }
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
      enableReinitialize
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
                <MenuItem value="logistics">logistics</MenuItem>
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

export default FormEdit
