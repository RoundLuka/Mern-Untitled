import { useEffect } from "react";
import useAuth from "../context/authContext";

const Register = () => {
    const { register } = useAuth();


    function handleRegister (e) {
        e.preventDefault()

        const account = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        register(account)

        e.target.reset()
    }

    return ( 
        <form onSubmit={handleRegister}>
            <input type="text" name="username" placeholder="Username" required /> <br />
            <input type="email" name="email" placeholder="Email" required /> <br />
            <input type="password" name="password" placeholder="Password" required /> <br />
            <button type="Submit">Register</button>
        </form>
    )
}

export default Register;