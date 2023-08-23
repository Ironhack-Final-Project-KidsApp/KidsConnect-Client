import { Link } from "react-router-dom";

function LoginPage() {
    return(
        <div>
            <h1>Welcome back to KidsConnect!</h1>
            <h2>Log in</h2>
                <form>
                    <div>
                        <label>Username</label>
                        <br />
                        <input type="text" name="username" />
                        <br />
                        <label>Password</label>
                        <br />
                        <input type="password" name="password" />
                        <br />
                    </div>
                    <button type="submit">Log in</button>
                </form>

            <p>Don't have an account? Please sign up here!<Link to="/signup">Log in</Link></p>
        </div>
    )
}


export default LoginPage;