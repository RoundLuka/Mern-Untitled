import { useState } from "react";
import useAuth from "../context/authContext";

const Verify = () => {
    const [code, setCode] = useState("");

    const { verify } = useAuth();

    function verifyCode() {
        verify({code})
    }

    return (
        <>
            <input type="text" placeholder="Code" onChange={(e) => setCode(e.target.value)}  value={code} />
            <button onClick={verifyCode}>Send</button>
        </>
    )
}

export default Verify;