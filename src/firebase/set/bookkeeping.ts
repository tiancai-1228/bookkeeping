import {
  child,
  push,
  ref,
  remove,
  serverTimestamp,
  set,
} from 'firebase/database';
import { bookkeeping } from '@/type/bookkeeping';
import moment from 'moment';
import { db } from '../firebase';
import { getBookkeeping } from '../get/bookkeeping';

//建立記帳簿
export const createBookkeeping = async (
  id: string,
  name: string,
): Promise<bookkeeping | null> => {
  try {
    const newKey = push(child(ref(db), `users/${id}/bookkeeping`)).key;
    await set(ref(db, `users/${id}/bookkeeping/${newKey}`), {
      id: newKey,
      name,
      createAt: serverTimestamp(),
    });

    return newKey ? await getBookkeeping(id, newKey) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

//刪除記帳簿
export const deleteBookkeeping = async (id: string, bookkeepingId: string) => {
  try {
    remove(ref(db, `users/${id}/bookkeeping/${bookkeepingId}`));
    return true;
  } catch (error) {
    return false;
  }
};

//收入
export const income = async (
  id: string,
  bookkeepingId: string,
  count: number,
) => {
  const year = moment().format('YYYY');
  const month = moment().format('M');
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/income`;

  const newKey = push(child(ref(db), Endpoint)).key;

  set(ref(db, `${Endpoint}/${newKey}`), {
    id: newKey,
    count,
    createAt: serverTimestamp(),
  });
};

//支出
export const expenses = async (
  id: string,
  bookkeepingId: string,
  category: string,
  count: number,
) => {
  const year = moment().format('YYYY');
  const month = moment().format('M');
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/expenses`;

  const newKey = push(child(ref(db), Endpoint)).key;

  set(ref(db, `${Endpoint}/${newKey}`), {
    id: newKey,
    count,
    category,
    createAt: serverTimestamp(),
  });
};
