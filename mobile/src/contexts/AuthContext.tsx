import React, { createContext, ReactNode, useEffect, useState } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrower from 'expo-web-browser'

WebBrower.maybeCompleteAuthSession()

export interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps; 
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserProps>({} as UserProps)
    const [isUserLoading, setIsUserLoading] = useState(false)

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '49702178113-67ptmth9jknodhgvbei4nsasikph3po9.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })
    
    const signIn = async () => {
        try {
            setIsUserLoading(true)
            await promptAsync()
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            setIsUserLoading(false)
        }
    }

    const signInWithGoogle = async (access_token: string) => {
        console.log('TOKEN de autenticação', access_token)
    }

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken)
        }
    }, [response])

    return (
        <AuthContext.Provider value={{
                signIn,
                isUserLoading,
                user,
            }}>
            {children}
        </AuthContext.Provider>
    )
}