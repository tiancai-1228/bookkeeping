import { child, get, ref } from 'firebase/database';
import { bookkeeping } from '@/type/bookkeeping';
import { db } from '../firebase';

const getBookkeepingList = async (id: string): Promise<bookkeeping[]> => {
  const dbRef = ref(db);
  const Endpoint = `users/${id}/bookkeeping`;

  return await get(child(dbRef, Endpoint))
    .then((res) => {
      if (res.exists()) {
        return Object.values(res.val()) as bookkeeping[];
      }
      return [];
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const getBookkeeping = async (id: string, bookkeepingId: string) => {
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

export { getBookkeeping, getBookkeepingList };
