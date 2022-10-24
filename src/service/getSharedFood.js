import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, where, limit } from 'firebase/firestore';

export const getSharedFood = async (user, updateFn) => {
  try {
    const q = query(collection(db, "share-"+user), orderBy('created', 'desc'), limit(31));
    const res = new Promise((resolve, reject) => {
      onSnapshot(q, (querySnapshot)=> {
        const resMap = querySnapshot.docs.map(doc => {
          const id = doc.id
          const data= doc.data()
          return {
            ...data, id 
          }
        })
        console.log(resMap)
        updateFn(resMap)
        resolve(resMap)
      })
    })
    return res;
  } catch (error) {
    console.log("eaeraar",error)
    alert(error)
  }
}