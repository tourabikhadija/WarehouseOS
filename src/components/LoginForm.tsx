"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";
import "@/style/LoginForm.css";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });


    if (result?.error) {
      setError("Email ou mot de passe incorrect");
      setLoading(false);
      return;
    }


    router.push("/dashboard");
  }


  return (
    <form onSubmit={handleSubmit}>
       <h1>WarehouseOS</h1>
      <div className="background">
            <Image src="/images/bg.jpg" alt="img-cover" fill priority 
            />
            <div className="overlay"></div>
            </div>

      {error && (
        <p className="error-message">{error}</p>
      )}

     <div className="login-card">
      <input
        type="email"
        placeholder="Adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />


      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />


      <button disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>

    </div>
    </form>
  );
}