type LoginResponse = {
  jwt: string
}

export default async function loginUser(username: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/authentication/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
    const data = (await res.json()) as LoginResponse
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
