"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@agrimart.com" && password === "123456") {
      router.push("/Dashboard/");
    } else {
      console.log("Invalid Email or Password");
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          width: "350px",
        }}
      >
        <h1>🌾 AgriMart Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            marginTop: "10px",
            padding: "10px",
            width: "100%",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            cursor: "pointer",
            marginTop: "15px",
            padding: "10px",
            width: "100%",
          }}
        >
          Login
        </button>

        <p style={{ marginTop: "15px" }}>
          Demo Login:
          <br />
          Email: admin@agrimart.com
          <br />
          Password: 123456
        </p>
      </div>
    </div>
  );
}
