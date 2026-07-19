import { createContext, useContext, useState, useEffect } from "react";

const authContext = createContext();

const useAuth = () => useContext(authContext);

export default useAuth;

const API_URL = "http://localhost:3000/api/auth"

export function AuthContextProvider({children}) {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });


    const register = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message)
            }
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(user))
            alert(data.message)
            
        } catch (err) {
            alert(err)
        }
    }
    
    const login = async (userData) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message)
            }
            setUser(data.user)
            localStorage.setItem("user", JSON.stringify(user))
            alert(data.message)
            
        } catch (err) {
            alert(err)
        }
    }

    return (
        <authContext.Provider value={{user, register, login}}>
            {children}
        </authContext.Provider>
    )
}