import { db } from './firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const addFood = async (data) => {
  try {
      await addDoc(collection(db, 'foods'), {...data, created: Timestamp.now() } );
  } catch (error) {
    alert(error)
  }
}