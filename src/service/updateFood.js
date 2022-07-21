import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updateFood = async (id, data) => {
  console.log("call update with", id, data)
  const taskDocRef = doc(db, data.user, id);
  try {
    await updateDoc(taskDocRef, { ...data } );
  } catch (error) {
    alert(error)
  }
}
