import React from 'react'
import {signInWithGoogle} from '../service/firebase.js'

export default function Login() {
  return (
    <div>
      <button onClick={signInWithGoogle}>Login</button>
    </div>
  )
}
