'use server'

interface LoginResponse {
  jwt?: string
  message?: string
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

    if (!res.ok) {
      return { message: 'A felhasználónév vagy jelszó nem megfelelő.' }
    }
    const data = (await res.json()) as LoginResponse
    return data
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during sign in.'
    return {
      message: errorMessage,
    }
  }
}
