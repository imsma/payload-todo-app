import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createTodo(formData: FormData): Promise<void> {
  'use server'
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const completed = formData.get('completed') ? true : false
  const media = (formData.get('media') as File) || null

  const payload = await getPayload({ config: payloadConfig })

  // use rest api to get the media uploaded and pass id
  // to the payload create todo
  let mediaId = null
  if (media && media.size > 0) {
    const mediaFormData = new FormData()
    mediaFormData.append('file', media)
    mediaFormData.append(
      '_payload',
      JSON.stringify({
        alt: 'ALT: ' + title,
      }),
    )

    const mediaResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, {
      method: 'POST',
      body: mediaFormData,
    })

    const mediaData = await mediaResponse.json()
    console.log(JSON.stringify(mediaData, null, 2))
    if (!mediaData?.doc?.id) {
      throw new Error('Failed to upload media')
    }
    mediaId = mediaData.doc.id
  }

  const todo = await payload.create({
    collection: 'todos',
    data: {
      title: title as string,
      description: description as string,
      completed: completed as boolean,
      ...(mediaId && { media: mediaId }), // Only include media if it exists
    },
  })

  revalidatePath('/')
  redirect('/')
}
