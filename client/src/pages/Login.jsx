import useAuth from "../context/authContext";

const Login = () => {
    const { login } = useAuth();


    function handleLogin (e) {
        e.preventDefault()

        const account = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        login(account)

        e.target.reset()
    }

    return ( 
        <form onSubmit={handleLogin}>
            <input type="email" name="email" placeholder="Email" required /> <br />
            <input type="password" name="password" placeholder="Password" required /> <br />
            <button type="Submit">Login</button>
        </form>
    )
}

export default Login;