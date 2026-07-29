"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/style/RegisterForm.css";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Une erreur est survenue.");
        return;
      }

      router.push("/login");
    } catch (error) {
      setError("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
    <h1>WarehouseOS</h1>
    <div className="register_page">
    
      
      
      <div className="form_register">
              {error && (
        <p className="error-message">{error}</p>
      )}
      
    <form onSubmit={handleSubmit} >
     

       <div className="background">
      <Image src="/images/bg.jpg" alt="img-cover" fill priority 
      />
      <div className="overlay"></div>
      </div>
      
      

      <div className="register-card">
      <input
        type="text"
        name="name"
        placeholder="Nom complet"
        value={formData.name}
        onChange={handleChange}
        
      />

      <input
        type="email"
        name="email"
        placeholder="Adresse email"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={handleChange}
        
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={handleChange}
        
      />


      <button 
        type="submit"
        disabled={loading}
      >
        {loading ? "Inscription..." : "S'inscrire"}
      </button>
    </div>
    </form>

      </div>


    </div>
    </div>
  );
}