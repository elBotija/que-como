import dayjs from 'dayjs';
import * as React from 'react';
import Paper  from '@mui/material/Paper';
import ScaleIcon from '@mui/icons-material/Scale';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import es from 'dayjs/locale/es'
import { ApplicationContext } from '../ApplicationContext';
dayjs.extend(customParseFormat)
dayjs.locale(es)

export default function LastWeight() {
  const { lastWeight }: any = React.useContext(ApplicationContext)
  return (

    <Paper elevation={3} className="widget" >
       <h2><ScaleIcon/> {lastWeight.peso}</h2>
      <small>{lastWeight.day}</small>
    </Paper>
  );
}
