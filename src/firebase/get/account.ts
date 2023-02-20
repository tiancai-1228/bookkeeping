import { child, get, ref } from 'firebase/database';
import { db } from '../firebase';

export const getUser = async (id: string) => {
  const dbRef = ref(db);
  const Endpoint = `users/${id}`;
  return await get(child(dbRef, Endpoint))
    .then((res) => {
      if (res.exists()) {
        return res.val();
      }
    })
    .catch((error) => {
      return null;
    });
};
