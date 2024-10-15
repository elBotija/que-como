import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import firebase from './service/firebase';
import Form from './components/Form';
import HistoryFoods from './components/HistoryFoods';
import Login from './components/Login';
import Divider from '@mui/material/Divider';
import SharedFood from './components/SharedFood';

function App() {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log("Estado de autenticación cambiado:", user ? `Usuario autenticado: ${user.uid}` : "No hay usuario autenticado");
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error("Error en el cambio de estado de autenticación:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut().then(() => {
      console.log("Usuario cerró sesión exitosamente");
    }).catch((error) => {
      console.error("Error al cerrar sesión:", error);
    });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (user) {
    return (
      <Container fixed>
        <p>
          <span><b>Hola {user.displayName}</b></span><br/>
          <span onClick={handleLogout}>Logout</span>
        </p>
        <SharedFood/>
        <h1>Carga tus comidas</h1>
        <Form/>
        <HistoryFoods/>
        <br/>
        <br/>
        <br/>
        <Divider textAlign="center">Gracias por cargar tus comidas</Divider>
        <p style={{textAlign:"center",color:"#888"}}>La información recolectada no se utiliza para otra cosa.</p>
      </Container>
    );
  }

  return (
    <Container fixed>
      <Login />
    </Container>
  );
}

export default App;