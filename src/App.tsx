import { Container } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from './ApplicationContext';
import Form from './components/Form';
import HistoryFoods from './components/HistoryFoods';
import Login from './components/Login';
import firebase from './service/firebase';
import Divider from '@mui/material/Divider';

function App() {
  const {user, updateUser}:any = useContext(ApplicationContext)

  useEffect(() => {
    console.log({firebase})
    firebase.auth().onAuthStateChanged((user:any) => {
      updateUser(user)
    })
  }, [])

  if(user){
    return (
      <Container fixed>
        <p>
          <span><b>Hola {user.displayName}</b></span><br/>
          <span onClick={() => firebase.auth().signOut()}>Logout</span>
        </p>

        <h1>Carga tus comidas</h1>
        <Form/>
        <HistoryFoods/>
        <br/>
        <br/>
        <br/>
        <Divider textAlign="center">Gracias por cargar tus comidas</Divider>
        <p style={{textAlign:"center",color:"#888"}}>La informacion recolectada no se utiliza para otra cosa.</p>
        <br/>
        <br/>
        <br/>
      </Container>
    );
  }
  return(
    <Container fixed>
      <Login/>
    </Container>
  );

}

export default App;
