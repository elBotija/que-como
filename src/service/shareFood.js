import { db } from './firebase';
import { collection, addDoc, Timestamp, query, onSnapshot, limit } from 'firebase/firestore';
import dayjs from 'dayjs';
import es from 'dayjs/locale/es'
dayjs.locale(es)

export const shareFood = async (data, user) => {
  try {
    //only add the food if the collection exist and have documents
    const q = query(collection(db, user), limit(1));
    const res = new Promise((resolve, reject) => {
      onSnapshot(q, (querySnapshot)=> {
        if(querySnapshot.docs.length > 0){
          const resMap = querySnapshot.docs.map(doc => {
            const id = doc.id
            const data= doc.data()
            return {
              ...data, id
            }
          })
          resolve(resMap)
        }else{
          resolve([])
        }
      })
    })
    const resMap = await res;
    if(resMap.length > 0){
      await addDoc(collection(db, "share-"+user), {user:user, foods:[data], ejercicio: "", peso: "", notas:"",  day: dayjs(data.time).format("dddd DD-MM-YYYY"), created: Timestamp.now() } );
    }else{
      console.log("No documents in the collection");
    }
  } catch (error) {
    alert(error)
  }
}
