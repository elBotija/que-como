import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updateFood = async (id, data) => {
  const taskDocRef = doc(db, 'foods', id);
  try {
    await updateDoc(taskDocRef, data );
  } catch (error) {
    alert(error)
  }
}