import dayjs from 'dayjs';
import * as React from 'react';
import { ApplicationContext } from '../ApplicationContext';
import ListOfFoods from './ListOfFoods';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import es from 'dayjs/locale/es'
import { CircularProgress } from '@mui/material';
dayjs.extend(customParseFormat)
dayjs.locale(es)

export default function HistoryFoods() {
  const { foods }:any = React.useContext(ApplicationContext)
  const [foodsToShow, setFoodsToShow] = React.useState<any[]>([]);
  const [sortedDays, setSortedDays] = React.useState<any[]>([]);

  React.useEffect(() => {
    //disable eslint for next line
    const dates = [] as any[];
    setFoodsToShow(foods.foods)
    //sorted dec days
    const sortedDays = foods.sort((a:any,b:any) => {
      return dayjs(a.day,"dddd DD-MM-YYYY").isAfter(dayjs(b.day,"dddd DD-MM-YYYY")) ? -1 : 1
    })
    console.log("sortedDays")
    console.log(sortedDays)
    setSortedDays(sortedDays)
    
  }, [foods])
    
  return (
    <>
      <h1>Tu ultimos 30 días</h1>
      {!sortedDays.length && <div className='center-content'><CircularProgress/></div>}
      {!!sortedDays.length && sortedDays.map((x:any, i:number) => {
        return (<div key={i}><ListOfFoods data={x.foods} date={x.day}/></div>)
      })}
    </>
  );
}








