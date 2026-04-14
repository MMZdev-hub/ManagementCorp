import RegisterForm from "../components/RegisterForm";
import "../styles/login.css";

export default function Register() {
    return (
        <div className="register-page">
            <div className="register-card">
                <h1 className="logo">
                    MANAGEMENT <span>CORP</span>
                </h1>

                <RegisterForm />
            </div>
        </div>
    );
}