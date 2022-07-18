import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'
dayjs.locale(es)

export const addFood = async (data) => {
  try {
    await addDoc(collection(db, data.user), {user:data.user, foods:[data], ejercicio: "", peso: "", notas:"",  day: dayjs(data.time).format("dddd DD-MM-YYYY"), created: Timestamp.now() } );
  } catch (error) {
    alert(error)
  }
}
