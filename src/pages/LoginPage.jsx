import LoginForm from "../components/LoginForm";
import "./LoginPage.css"

function LoginPage() {
    return (
        <section className="login-page">
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <div className="login-form">
                        <h1>Welcome Back!</h1>
                        <div className="form">
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="image">
                            <img src="/heart2.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage;