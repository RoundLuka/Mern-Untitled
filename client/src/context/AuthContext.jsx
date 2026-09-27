import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const authContext = createContext();

const useAuth = () => useContext(authContext);

export default useAuth;

const API_URL = "http://localhost:3000/api/auth"

export function AuthContextProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);


    const register = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message)
            }
            setUser(data.user)
            toast.success(data.message)
            navigate('/verify')
        } catch (err) {
            toast.error(err)
        }
    }
    
    const login = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message)
            }
            setUser(data.user)
            toast.success(data.message)
            navigate('/')
            
        } catch (err) {
            toast.error(err)
        }
    }

    const verify = async (code) => {
        try {
            const response = await fetch(`${API_URL}/verify`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(code)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message)
            }

            toast.success(data.message)
            navigate('/')
        } catch (err) {
            toast.error(err)
        }
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <authContext.Provider value={{user, register, login, logout, verify}}>
            {children}
        </authContext.Provider>
    )
}