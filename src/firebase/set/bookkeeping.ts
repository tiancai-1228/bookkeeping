import { child, push, ref, serverTimestamp, set } from 'firebase/database';
import moment from 'moment';
import { db } from '../firebase';

//建立記帳簿
export const createBookkeeping = async (id: string, name: string) => {
  const newKey = push(child(ref(db), `users/${id}/bookkeeping`)).key;

  set(ref(db, `users/${id}/bookkeeping/${newKey}`), {
    id: newKey,
    name,
    createAt: serverTimestamp(),
  });
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
  count: number,
) => {
  const year = moment().format('YYYY');
  const month = moment().format('M');
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/expenses`;

  const newKey = push(child(ref(db), Endpoint)).key;

  set(ref(db, `${Endpoint}/${newKey}`), {
    id: newKey,
    count,
    createAt: serverTimestamp(),
  });
};
