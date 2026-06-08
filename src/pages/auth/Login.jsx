import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ShieldCheck } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("siva@authorizer.in");
  const [password, setPassword] = useState("admin-created");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/authorizer/dashboard");
  };

  return (
    <main className="loginScreen">
      <section className="loginCard">
        <div className="loginBrand">
          <ShieldCheck size={44} />
          <h1>Authorizer Farm Verification</h1>
          <p>
            Use Admin-created credentials to access assigned verification tasks.
          </p>
        </div>

        <form className="loginForm" onSubmit={handleSubmit}>
          <label>
            Email or phone
            <input
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder="Enter email or phone"
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </label>

          <div className="formMeta">
            <Link to="/login">Forgot password?</Link>
            <span>Role verified after login</span>
          </div>

          <button className="primaryButton" type="submit">
            <LogIn size={18} />
            Login
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
