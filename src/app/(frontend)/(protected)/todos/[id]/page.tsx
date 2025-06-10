import { Media } from '@/payload-types'
import config from '@/payload.config'
import { getUser } from '@/utils/get-user'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

// export default async function TodoPage({ params }: { params: { id: string } }) {
export default async function TodoPage({ params }: { params: Promise<{ id: string }> }) {
  const { user } = await getUser()
  if (!user) {
    redirect('/login')
  }

  const { id } = await params

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`)
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

      {console.log('todo.media= ', todo.media)}
      {todo.media && typeof todo.media === 'object' && 'url' in todo.media && (
        <Image
          src={(todo.media as Media).url || ''}
          alt={(todo.media as Media).alt || ''}
          width={200}
          height={200}
        />
      )}
    </div>
  )
}
