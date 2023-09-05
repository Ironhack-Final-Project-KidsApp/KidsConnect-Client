import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.services";


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { email, password };
        authService
            .login(requestBody)
            .then((response) =>{
                storeToken(response.data.authToken)
                authenticateUser()
                navigate("/")
            } )
            .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error' 
            setErrorMessage(errorMessage)})
    }
    return(
        <div>
            <h2>Log in</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <br />
                        <input type="text" name="email"  value={email} onChange={handleEmail}/>
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" name="password" value={password} onChange={handlePassword} />
                        <br />
                    </div>
                    <button type="submit">Log in</button>
                </form>

            { errorMessage && <p>{errorMessage}</p> }

            <p>Don't have an account? Please sign up here!<Link to="/signup">Log in</Link></p>
        </div>
    )
}


export default LoginPage;