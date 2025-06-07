import { Media } from '@/payload-types'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

export default async function TodoPage({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todoData = await payload.findByID({
    collection: 'todos',
    id: params.id,
  })

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${params.id}`)
  const todo = await response.json()

  return (
    <div
      style={{
        border: '1px solid #ccc',
        margin: '20px',
        padding: '10px',
        marginBottom: '10px',
      }}
      key={todo.id}
    >
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2> ← Back to Todos</h2>
      </Link>
      <h3>{todo.title}</h3>
      <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
      <p>{todo.createdAt}</p>
      <p>{todo.updatedAt}</p>
      <Image
        src={(todo.media as Media).url || ''}
        alt={(todo.media as Media).alt || 'Todo Media'}
        width={200}
        height={200}
      />
    </div>
  )
}
