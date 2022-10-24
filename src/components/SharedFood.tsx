import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ApplicationContext } from '../ApplicationContext';
import dayjs from 'dayjs';
import { addFood } from '../service/addFood';
import { deleteShareFood } from '../service/deleteShareFood';

export default function SharedFood() {
  const { sharedFood, user }:any = React.useContext(ApplicationContext);
  const [alert, setAlert] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log("share13Food", sharedFood);
    const filter = sharedFood.map((x: any) => ({ ...x.foods[0], id: x.id, created: x.created }));
    setAlert(filter);
  }, [sharedFood]);

  const email = user && user.email ? user.email : "";
  return (
    <>
      {!!alert.length &&
        alert.map((food: any) => (

          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert icon={false} onClose={() => {deleteShareFood(food.id, email)}} className="share-food" severity="info">
              Comida: {food.typeFood} - {food.comida} - {food.bebida} - {food.postre} <br />
              {dayjs.unix(food.time.seconds).format("DD-MM-YYYY HH:mm")}
              <Button color='success' size="small" onClick={() => {
                try{
                  addFood(food)
                  deleteShareFood(food.id, email)
                }catch(e){
                  console.log(e)
                }
              }}>Aceptar</Button>
            </Alert>
          </Stack>
        ))
      }
    </>
  );
}






