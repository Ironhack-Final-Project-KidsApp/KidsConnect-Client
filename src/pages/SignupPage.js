import { Link } from "react-router-dom";
function SignupPage() {
    return(
        <div>
            <h1>Welcome to KidsConnect!</h1>
            <h2>Sign up</h2>
                <form>
                    <div>
                        <label>Username</label>
                        <br />
                        <input type="text" name="username" />
                        <br />
                        <label>Email</label>
                        <br />
                        <input type="text" name="email" />
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" name="password" />
                        <br />
                    </div>
                    <p>By signing up, you agree with all our terms and conditions!</p>
                    <button type="submit">Sign up</button>
                </form>

            <p>Already have an account? Please log in here!<Link to="/login">Log in</Link></p>
        </div>
    )
}


export default SignupPage;