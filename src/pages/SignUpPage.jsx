import SignUpForm from "../components/SignupForm";

import "./SignUpPage.css"

function SignUpPage() {
    return (
        <section className="signup-page">
            <div className="container" id="container">
                <div className="signup-form">
                    <h1>Hello There!</h1>
                    <div className="form">
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUpPage;