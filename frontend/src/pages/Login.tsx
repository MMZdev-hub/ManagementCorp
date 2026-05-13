import LoginForm from "../components/LoginForm";
import "../styles/login.css";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        
        <h1 className="logo">
          MANAGEMENT <span>CORP</span>
        </h1>

        <LoginForm />

      </div>
    </div>
  );
}