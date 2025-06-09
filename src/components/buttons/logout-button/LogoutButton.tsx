'use client'
import { useRouter } from 'next/navigation'
import './style.css'
const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for session management
      })

      if (!response.ok) {
        alert('Logout failed. Please try again.')
        return
      }

      const result = await response.json()
      console.log('Logout successful:', result)
      router.refresh()
      router.push('/login') // Redirect to login page after logout
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutButton
