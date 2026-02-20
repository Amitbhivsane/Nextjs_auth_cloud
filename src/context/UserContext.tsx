'use client'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

type userType = {
  name: string,
  email: string,
  id: string,
  image?: string
}

type userContextType = {
  user: userType | null | undefined,
  setUser: (user: userType) => void
}

export const userDataContext =
  React.createContext<userContextType | undefined>(undefined)

function UserContext({ children }: { children: React.ReactNode }) {

  const { status } = useSession()
  const [user, setUser] = useState<userType | null>()

  useEffect(() => {

    async function getUser() {
      try {
        const result = await axios.get("/api/user")
        setUser(result.data)
      } catch (error) {
        console.log("User fetch error:", error)
      }
    }

    if (status === "authenticated") {
      getUser()
    }

  }, [status])

  return (
    <userDataContext.Provider value={{ user, setUser }}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext