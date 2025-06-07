import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { Todo } from '@/payload-types'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div>
      <h1>Payload TodoList {user?.email}</h1>
      <div className="todos">
        <h2>Todos</h2>
        <Link href="/todo-create"> Create Todo</Link>

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
