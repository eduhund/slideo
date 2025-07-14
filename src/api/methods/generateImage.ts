import { post } from '../controller'

export default async function generateImage(
  content: string,
  promt: string
): Promise<string> {
  const data = await post('generateImage', {
    content,
    promt,
  })

  return data?.data?.image || null
}
