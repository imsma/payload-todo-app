import { redirect } from 'next/navigation'
import React from 'react'
import { fileURLToPath } from 'url'
import '../../styles.css'
import { Todo } from '@/payload-types'
import Link from 'next/link'
import LogoutButton from '@/components/buttons/logout-button/LogoutButton'
import { getUser } from '@/utils/get-user'

export default async function HomePage() {
  const { user, payload } = await getUser()
  if (!user) {
    redirect('/login')
  }

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`
  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div>
      <h1>Payload TodoList {user?.email}</h1>
      <div className="todos">
        <h2>Todos</h2>
        <Link
          href="/todo-create"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'background 0.2s',
          }}
        >
          Create Todo
        </Link>

        <LogoutButton />

        {todos.docs.map((todo: Todo) => (
          <div
            style={{
              border: '1px solid #ccc',
              margin: '20px',
              padding: '10px',
              marginBottom: '10px',
            }}
            key={todo.id}
          >
            <Link href={`/todos/${todo.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{todo.title}</h3>
            </Link>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
            <p>{todo.createdAt}</p>
            <p>{todo.updatedAt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
