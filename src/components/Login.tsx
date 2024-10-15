import React from 'react'
import { signInWithGoogle } from '../service/firebase.js'

export default function Login() {
  const handleLogin = async () => {
    console.log("Iniciando proceso de login con Google");
    try {
      const result = await signInWithGoogle();
      console.log("Inicio de sesión completado", result.user?.uid);
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <div>
      <h1>Bienvenido a Que Como</h1>
      <button onClick={handleLogin}>Login con Google</button>
    </div>
  )
}