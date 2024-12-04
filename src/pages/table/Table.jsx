import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material'

const Tables = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  // const navigate = useNavigate() // React Router hook for navigation
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  const theme = useTheme()
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)')

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/v1/users/list`)
        setData(response.data?.data || []) // Ensure response data is safely accessed
      } catch (error) {
        setError('Error fetching data')
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?',
    )
    if (!confirmDelete) return

    try {
      await axios.delete(`${API_BASE_URL}/v1/users/remove?userId=${userId}`)
      setData((prevData) => prevData.filter((item) => item._id !== userId)) // Update state after deletion
      alert('User deleted successfully!')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user. Please try again.')
    }
  }

  // Memoize the transformation of data for rendering
  const rows = useMemo(() => {
    return data.map((item) => ({
      ...item,
      dateOfBirth: new Date(item.dateOfBirth).toLocaleDateString(),
      createdAt: new Date(item.createdAt).toLocaleString(),
      actions: (
        <div style={{ display: 'flexEnd', gap: '10px' }}>
          <Link to={`/edit-form/${item?._id}`}>
            <EditIcon style={{ cursor: 'pointer', color: 'green' }} />
          </Link>
          <DeleteIcon
            style={{ cursor: 'pointer', color: 'red' }}
            onClick={() => handleDelete(item._id)} // Call delete handler
          />
        </div>
      ),
    }))
  }, [data])

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>
  }

  return (
    <Box
      width={isNonMobileScreens ? '80%' : '93%'}
      m="2rem auto"
      borderRadius="1.5rem"
      backgroundColor={theme.palette.background.alt}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user data table">
          <TableHead>
            <TableRow>
              {[
                'First Name',
                'Last Name',
                'Email',
                'Date of Birth',
                'Actions',
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{ fontSize: '20px', fontWeight: 'bold' }}
                  align="right"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.email || index} // Use a unique key if available
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.dateOfBirth}</TableCell>
                <TableCell align="right">{row.actions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Tables
