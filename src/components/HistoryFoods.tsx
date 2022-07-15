import dayjs from 'dayjs';
import * as React from 'react';
import { ApplicationContext } from '../ApplicationContext';
import ListOfFoods from './ListOfFoods';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import es from 'dayjs/locale/es'
dayjs.extend(customParseFormat)
dayjs.locale(es)

export default function HistoryFoods() {
  const { foods }:any = React.useContext(ApplicationContext)
  const [foodsToShow, setFoodsToShow] = React.useState<any[]>([]);
  const [sortedDays, setSortedDays] = React.useState<any[]>([]);

  React.useEffect(() => {
    //disable eslint for next line
    const dates = [] as any[];
    const foodsbyDate = foods.reduce((acc:any, food:any) => {
      const date = dayjs.unix(food.time.seconds).format('dddd DD-MM-YYYY')
      if(!acc[date]){
        acc[date] = []
        dates.push(date)
      }
      acc[date].push(food)
      return acc
    }
    , {})
    setFoodsToShow(foodsbyDate)
    //sorted dec days
    const sortedDays = dates.sort((a,b) => {
      return dayjs(a,"dddd DD-MM-YYYY").isAfter(dayjs(b,"dddd DD-MM-YYYY")) ? -1 : 1
    })
    console.log(sortedDays)
    setSortedDays(sortedDays)
    
  }, [foods])
  
  return (
    <>
      <h1>Tu ultimos 30 días</h1>
      
      {!!sortedDays.length && sortedDays.map((day:any, i:number) => {
        return (<div key={i}><ListOfFoods data={foodsToShow[day]} date={day}/></div>)
      })}
    </>
  );
}








