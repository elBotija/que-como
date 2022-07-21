import React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Stack from '@mui/material/Stack';
import { ApplicationContext } from '../ApplicationContext';
import {addFood} from '../service/addFood';
import dayjs from 'dayjs';
import { updateFood } from '../service/updateFood';
import { v4 as uuidv4 } from 'uuid';
import es from 'dayjs/locale/es'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import EditIcon from '@mui/icons-material/Edit';

dayjs.extend(customParseFormat)
dayjs.locale(es)

interface Props { 
  data: {
    notas: string,
    ejercicio: string,
    peso: string,
    id: string
  },
}; 

export default function Others({data}:Props) {
  const [notas, setNotas] = React.useState('');
  const [ejercicio, setEjercicio] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [edit, setEdit] = React.useState(false);
  
  const { user, editFood, updateEditFood, foods }: any = useContext(ApplicationContext);

  useEffect(() => {
    setNotas(data.notas);
    setEjercicio(data.ejercicio);
    setPeso(data.peso);
  }, [])
  
  const hasData = !!notas.length || !!ejercicio.length || !!peso.length;

  return (
    <> 
      <h3>Otros datos <span className="c-pointer" onClick={()=> setEdit(true)}> {hasData ? "| Editar |" : "| Agregar |" }</span></h3>
      {!edit && 
        <div>
          {!!notas.length && <p><b>Notas:</b> {notas}</p>}
          {!!ejercicio.length && <p><b>Ejercicio:</b> {ejercicio}</p>}
          {!!peso.length && <p><b>Peso:</b> {peso}</p>}
        </div>
      }

      {edit && 
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, },
            '& .MuiButton-root': { m: 1, },
            '& .MuiFormControl-root': { m: 1, },
            '& .time .MuiOutlinedInput-root': { m: 0, width: '100%', },
            '& .MuiFormControl-root.time .MuiFormControl-root': { m: 0, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField fullWidth
              id="outlined-multiline-flexible"
              label="Notas"
              multiline
              maxRows={4}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
            <TextField fullWidth
              id="outlined-multiline-flexible"
              label="Ejercicio"
              multiline
              maxRows={4}
              value={ejercicio}
              onChange={(e) => setEjercicio(e.target.value)}
            />
            <TextField fullWidth
              id="outlined-multiline-flexible"
              label="Peso"
              multiline
              maxRows={4}
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>
          <>
            <Button variant="contained" color="primary" onClick={()=> {
              const email = user.email;
              updateFood(data.id, {peso, notas, ejercicio, user: user.email})
              setEdit(false)
            }}>Guardar</Button>
            <Button variant="contained" color='inherit'  onClick={()=> {
              setEdit(false)
            }}>Cancelar</Button>
          </>
        </Box>
      }
    </>
  );
}