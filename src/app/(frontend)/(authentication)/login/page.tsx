'use client'

import { useRouter } from 'next/navigation'

import '../../styles.css'
import './style.css'
import { getUser } from '@/utils/get-user'

export default async function LoginPage() {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
      alert('Email and password are required')
      return
    }

    console.log('Logging in...')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies in the request
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      alert('Login failed. Please check your credentials.')
      return
    }

    const result = await response.json()
    console.log('Login successful:', result)
    router.refresh()
    router.push('/') // Redirect to the dashboard or another page after successful login
  }

  return (
    <div className="container">
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Enter your password"
            required
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
