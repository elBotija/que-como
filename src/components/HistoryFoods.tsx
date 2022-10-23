import dayjs from 'dayjs';
import * as React from 'react';
import { ApplicationContext } from '../ApplicationContext';
import ListOfFoods from './ListOfFoods';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import es from 'dayjs/locale/es'
import { CircularProgress } from '@mui/material';
import Others from './Others';
import LastWeight from './LastWeight';
dayjs.extend(customParseFormat)
dayjs.locale(es)

export default function HistoryFoods() {
  const { foods, updateLastWeight }: any = React.useContext(ApplicationContext)
  const [foodsToShow, setFoodsToShow] = React.useState<any[]>([]);
  const [sortedDays, setSortedDays] = React.useState<any[]>([]);

  React.useEffect(() => {
    //disable eslint for next line
    const dates = [] as any[];
    // setFoodsToShow(foods.foods)
    const sortedFoods = async () => {
      //sorted dec days
      const sortedDays = await foods.sort((a: any, b: any) => {
        return dayjs(a.day, "dddd DD-MM-YYYY").isAfter(dayjs(b.day, "dddd DD-MM-YYYY")) ? -1 : 1
      })
      console.log("sorteado 1")

      // sort foods by time
      const sortedFoods = await sortedDays.map((day: any) => {
        day.foods = day.foods.sort((a: any, b: any) => {
          console.log(dayjs(a.time, "HH:mm"))
          return dayjs.unix(a.time.seconds).isAfter(dayjs.unix(b.time.seconds)) ? 1 : -1
        })
        return day
      })
      console.log("sorteado 2")

      setSortedDays(sortedDays)

      const myLastWeight = sortedDays.length ? sortedDays.find((x:any) => x.peso) : { peso: "-", day: "" }
      updateLastWeight(myLastWeight);
      console.log(sortedFoods)
    }
    sortedFoods()

  }, [foods])

  return (
    <>
      <div className="history-title">
        <h1>Tu ultimos 30 días</h1>
        <LastWeight/>
      </div>
      {!sortedDays.length && <div className='center-content'><CircularProgress /></div>}
      {!!sortedDays.length && sortedDays.map((x: any, i: number) => {
        return (<div key={i}>
          <ListOfFoods data={x.foods} date={x.day} />
          <Others data={{ notas: x.notas, ejercicio: x.ejercicio, peso: x.peso, id: x.id }} />
        </div>)
      })}
    </>
  );
}








