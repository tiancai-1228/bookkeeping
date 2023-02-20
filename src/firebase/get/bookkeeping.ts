import { child, get, ref } from 'firebase/database';
import { db } from '../firebase';

export const getBookkeeping = async (id: string, bookkeepingId: string) => {
  const dbRef = ref(db);
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}`;

  return await get(child(dbRef, Endpoint))
    .then((res) => {
      if (res.exists()) {
        return res.val();
      }
      return null;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};
