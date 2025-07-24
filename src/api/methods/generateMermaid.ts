import { post } from '../controller'

export default async function generateMermaid(
  content: string,
  promt: string
): Promise<string> {
  const data = await post('generateMermaid', {
    content,
    promt,
  })

  return data?.mermaid || null
}
