import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleLogout = async () => {
      const token = localStorage.getItem('token')
      const apiUrl = `${import.meta.env.VITE_BASE_URL}/users/logout`
      console.log('Attempting logout to:', apiUrl)
      console.log('Token:', token)

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        console.log('Logout successful:', response)
        localStorage.removeItem('token')
        navigate('/login')
      } catch (error) {
        console.error('Logout failed - Full error:', error)
        console.error('Error message:', error.message)
        if (error.response) {
          console.error('Error response:', error.response.data)
          setError(`Server error: ${error.response.data.message || 'Unknown error'}`)
        } else if (error.request) {
          console.error('No response received')
          setError('Could not connect to the server. Please check your internet connection.')
        } else {
          console.error('Error setting up request:', error.message)
          setError('An unexpected error occurred')
        }
        // Still navigate to login even if logout fails
        localStorage.removeItem('token')
        navigate('/login')
      }
    }

    handleLogout()
  }, [navigate])

  return (
    <div>
      {error ? (
        <div style={{ color: 'red' }}>
          {error}
        </div>
      ) : (
        <div>Logging out...</div>
      )}
    </div>
  )
}

export default UserLogout