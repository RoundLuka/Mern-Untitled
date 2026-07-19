import { Link } from "react-router"
import useAuth from "../context/authContext";

const Navbar = () => {
    const { user } = useAuth();

    return (
        <ul>
            <li><Link to="/">Home</Link></li>

            {user ? <li><Link to="/admin">Admin</Link></li> 
            : (
                <>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </>
            )}
        </ul>
    )
}

export default Navbar;