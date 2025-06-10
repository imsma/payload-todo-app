import { createTodo } from '@/app/actions/createTodoaction'
import { getUser } from '@/utils/get-user'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function TodoCreatePage() {
  const { user } = await getUser()
  if (!user) {
    redirect('/login')
  }

  const handleCancel = () => {
    redirect('/')
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        paddingTop: '40px',
        background: '#18181b', // dark background
      }}
    >
      <h1 style={{ marginBottom: '24px', color: '#fff' }}>Create a new Todo</h1>
      <form
        action={async (formData) => {
          'use server'
          await createTodo(formData)
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          background: '#27272a',
          padding: '32px 28px',
          borderRadius: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          minWidth: '340px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="title" style={{ fontWeight: 500, color: '#fff' }}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #444',
              fontSize: '16px',
              color: '#fff',
              background: '#18181b',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="description" style={{ fontWeight: 500, color: '#fff' }}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #444',
              fontSize: '16px',
              minHeight: '60px',
              resize: 'vertical',
              color: '#fff',
              background: '#18181b',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label htmlFor="media" style={{ fontWeight: 500, color: '#fff' }}>
            Media URL:
          </label>
          <input
            type="file"
            id="media"
            name="media"
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #444',
              fontSize: '16px',
              color: '#fff',
              background: '#18181b',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            style={{ width: '18px', height: '18px' }}
          />
          <label htmlFor="completed" style={{ fontWeight: 500, marginBottom: 0, color: '#fff' }}>
            Completed
          </label>
        </div>
        <button
          type="submit"
          style={{
            marginTop: '10px',
            padding: '10px 0',
            borderRadius: '4px',
            border: 'none',
            background: '#0070f3',
            color: '#fff',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          Create Todo
        </button>
        <Link
          href="/"
          style={{
            marginTop: '10px',
            padding: '10px 0',
            borderRadius: '4px',
            border: 'none',
            background: 'grey',
            color: '#fff',
            fontWeight: 600,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.2s',
            textAlign: 'center',
            textDecoration: 'none',
          }}
        >
          Cancel
        </Link>
      </form>
    </div>
  )
}
