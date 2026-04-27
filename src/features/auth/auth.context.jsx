import { createContext, useState, useEffect } from "react";
import axios from "axios";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => { 

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in
        const checkAuth = async () => {
            try {
                const api = axios.create({
                    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
                    withCredentials: true
                })
                
                const response = await api.get('/api/auth/get-me')
                setUser(response.data.user)
            } catch (err) {
                // User is not logged in, that's okay
                console.log("User not authenticated")
            } finally {
                setLoading(false)
            }
        }

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{user,setUser,loading,setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    
}