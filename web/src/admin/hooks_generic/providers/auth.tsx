import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { api } from '@/admin/utils/handleClient'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

export interface IUser {
  id: string
  name: string
  created_at: string
  updated_at: string
}

interface IAuthState {
  token: string
  user: IUser
}

interface IAuthContextData {
  user: IUser
  token: string
  signIn(data: IAuthState): IAuthState | null
  signOut(): void
  updateUser(user: IUser): void
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState)

  const signIn = useCallback((data: IAuthState) => {
    const { token, user } = data

    if (user) {
      setCookie(null, '@AvantCargo:token', token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      setCookie(null, '@AvantCargo:user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      api.defaults.headers.authorization = `Bearer ${token}`

      setData({ token, user })
      return { token, user }
    }
    return { token, user }
  }, [])

  const cookies = parseCookies()
  const {
    '@AvantCargo:token': tokenStorage,
    '@AvantCargo:user': userStorage,
  } = cookies

  useEffect(() => {
    if (tokenStorage && userStorage) {
      api.defaults.headers.authorization = `Bearer ${tokenStorage}`

      setData({ token: tokenStorage, user: JSON.parse(userStorage) })
    }
  }, [tokenStorage, userStorage])

  const signOut = useCallback(() => {
    destroyCookie(null, '@AvantCargo:token', {
      path: '/',
    })
    destroyCookie(null, '@AvantCargo:user', {
      path: '/',
    })

    setData({} as IAuthState)
  }, [setData])

  const updateUser = useCallback(
    (user: IUser) => {
      setCookie(null, '@AvantCargo:user', JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      setData({
        token: data.token,
        user,
      })
    },
    [setData, data.token],
  )

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
