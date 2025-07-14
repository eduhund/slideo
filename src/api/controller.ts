export async function get(endpoint: string, query: Object) {
  try {
    const baseURI = 'https://slideo.eduhund.com/api/'
    const queryString = new URLSearchParams(
      query as Record<string, string>
    ).toString()
    const fullURI = baseURI + endpoint + '?' + queryString
    const response = await fetch(fullURI, {
      method: 'GET',
    })
    return await response.json()
  } catch {
    return null
  }
}

export async function post(endpoint: string, data: Object) {
  try {
    const baseURI = 'https://slideo.eduhund.com/api/'
    const fullURI = baseURI + endpoint
    const response = await fetch(fullURI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    return await response.json()
  } catch {
    return null
  }
}
