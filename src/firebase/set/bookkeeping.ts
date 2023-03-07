import {
  child,
  push,
  ref,
  remove,
  serverTimestamp,
  set,
  update,
} from 'firebase/database';
import { bookkeeping } from '@/type/bookkeeping';
import { category } from '@/type/categories';
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

export const updateBookkeeping = async (
  id: string,
  bookkeepingId: string,
  name: string,
) => {
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}`;

  update(ref(db, Endpoint), {
    name,
  });
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
  time: { year: string; month: string; date: string },
  category: category,
  count: number,
  memo?: string,
) => {
  const { year, month, date } = time;
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/income`;

  const newKey = push(child(ref(db), Endpoint)).key;

  set(ref(db, `${Endpoint}/${newKey}`), {
    id: newKey,
    count,
    category,
    memo,
    type: 'income',
    date: `${year}-${month}-${date}`,
    createAt: serverTimestamp(),
  });
};

export const updateIncome = async (
  id: string,
  bookkeepingId: string,
  incomeId: string,
  time: { year: string; month: string; date: string },
  category: category,
  count: number,
  memo?: string,
) => {
  const { year, month, date } = time;
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/income/${incomeId}`;

  update(ref(db, Endpoint), {
    count,
    category,
    memo,
    date: `${year}-${month}-${date}`,
  });
};

export const deleteIncome = async (
  id: string,
  bookkeepingId: string,
  incomeId: string,
  time: { year: string; month: string },
) => {
  const { year, month } = time;
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/income/${incomeId}`;
  remove(ref(db, Endpoint));
};

//支出
export const expenses = async (
  id: string,
  bookkeepingId: string,
  time: { year: string; month: string; date: string },
  category: category,
  count: number,
  memo?: string,
) => {
  const { year, month, date } = time;
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/expenses`;

  const newKey = push(child(ref(db), Endpoint)).key;

  set(ref(db, `${Endpoint}/${newKey}`), {
    id: newKey,
    count,
    category,
    memo,
    type: 'expenses',
    date: `${year}-${month}-${date}`,
    createAt: serverTimestamp(),
  });
};

export const updateExpenses = async (
  id: string,
  bookkeepingId: string,
  expensesId: string,
  time: { year: string; month: string; date: string },
  category: category,
  count: number,
  memo?: string,
) => {
  const { year, month, date } = time;
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/expenses/${expensesId}`;

  update(ref(db, Endpoint), {
    count,
    category,
    memo,
    date: `${year}-${month}-${date}`,
  });
};

export const deleteExpenses = async (
  id: string,
  bookkeepingId: string,
  expensesId: string,
  time: { year: string; month: string },
) => {
  const { year, month } = time;
  const Endpoint = `users/${id}/bookkeeping/${bookkeepingId}/data/${year}/${month}/expenses/${expensesId}`;
  remove(ref(db, Endpoint));
};
