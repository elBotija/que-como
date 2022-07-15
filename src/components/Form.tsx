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

export default function From() {
  const [comida, setComida] = React.useState('');
  const [bebida, setBebida] = React.useState('');
  const [postre, setPostre] = React.useState('');
  const [typeFood, setTypeFood] = React.useState('');
  const [time, setTime] = React.useState<Date | null>(
    new Date(),
  );
  const { updateFoods, user, editFood, updateEditFood }: any = useContext(ApplicationContext);

  const handleChangeTime = (newValue: Date | null) => {
    console.log("eeeee time",newValue)
    setTime(newValue);
  };

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setTypeFood(event.target.value as string);
  };

  const cleraForm = () => {
    setComida('');
    setBebida('');
    setPostre('');
    setTypeFood('');
    setTime(new Date());
  }

  useEffect(() => {
    if (editFood.id) {
      setComida(editFood.comida);
      setBebida(editFood.bebida);
      setPostre(editFood.postre);
      setTypeFood(editFood.typeFood);
      setTime(dayjs.unix(editFood.time.seconds).toDate());
    } else {
      cleraForm();
    }
  }, [editFood])


  return (
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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo de comida</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeFood}
            label="Tipo de comida"
            onChange={handleChangeSelect}
          >
            <MenuItem value={"colacion"}>Colación</MenuItem>
            <MenuItem value={"desayuno"}>Desayuno</MenuItem>
            <MenuItem value={"almuerzo"}>Almuerzo</MenuItem>
            <MenuItem value={"merienda"}>Merienda</MenuItem>
            <MenuItem value={"cena"}>Cena</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth className="time">
          <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
            <Stack direction="row" spacing={3}>
              <MobileDatePicker
                label="Dia"
                inputFormat="MM/dd/yyyy"
                value={time}
                onChange={handleChangeTime}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Hora"
                value={time}
                onChange={handleChangeTime}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </FormControl>
        <TextField fullWidth
          id="outlined-multiline-flexible"
          label="Comida"
          multiline
          maxRows={4}
          value={comida}
          onChange={(e) => setComida(e.target.value)}
        />
        <TextField fullWidth
          id="outlined-multiline-flexible"
          label="Bebida"
          multiline
          maxRows={4}
          value={bebida}
          onChange={(e) => setBebida(e.target.value)}
        />
        {(typeFood === "almuerzo" || typeFood === "cena") && (
          <TextField fullWidth
            id="outlined-multiline-flexible"
            label="Postre"
            multiline
            maxRows={4}
            value={postre}
            onChange={(e) => setPostre(e.target.value)}
          />
        )}
      </div>
      {editFood.id && <>
        <Button variant="contained" color="primary" onClick={(e)=> {
          e.preventDefault();
          updateFood(editFood.id, {comida, bebida, postre, typeFood, time})
        }}>Editar</Button>
        <Button variant="contained"  onClick={(e)=> {
          e.preventDefault();
          updateEditFood({})
        }}>Cancelar</Button>
      </>
      }
      {!editFood.id &&
        <Button variant="contained" color="primary" onClick={()=> {
          const email = user.email;
          addFood({comida, bebida, postre, typeFood, time, user: email})
          cleraForm()
        }}>Guardar</Button>
      }
    </Box>
  );
}