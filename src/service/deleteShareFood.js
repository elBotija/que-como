import { db } from './firebase';
import { deleteDoc,doc } from "firebase/firestore";

export const deleteShareFood = async (id, user) => {
  //delete document from firestore
  const taskDocRef = doc(db, "share-"+user, id);
  try {
    await deleteDoc(taskDocRef);
  }
  catch (error) {
    alert(error)
  }
}