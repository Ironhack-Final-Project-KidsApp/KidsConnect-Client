import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";


function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { email, password, name };
        authService
            .signup(requestBody)
            .then((response) => {
                navigate("/login");
              })
            .catch((err) => {const errorMessage = err?.response?.data?.message ?? 'Internal error' 
                 setErrorMessage(errorMessage)})
    }
    
    return(
        <div>
            <h1>Welcome to KidsConnect!</h1>
            <h2>Sign up</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <br />
                        <input type="text" name="name" value={name} onChange={handleName}/>
                        <br />
                        <label>Email</label>
                        <br />
                        <input type="text" name="email" value={email}  onChange={handleEmail} />
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" name="password" value={password}  onChange={handlePassword} />
                        <br />
                    </div>
                    <p>By signing up, you agree with all our terms and conditions!</p>
                    <button type="submit">Sign up</button>
                </form>

                { errorMessage && <p>{errorMessage}</p> }

            <p>Already have an account? Please log in here!<Link to="/login">Log in</Link></p>
        </div>
    )
}


export default SignupPage;