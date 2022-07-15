import { db } from './firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export const deleteFood = async (id) => {
  const taskDocRef = doc(db, 'foods', id);
  try {
    await deleteDoc(taskDocRef);
  } catch (error) {
    alert(error)
  }
}