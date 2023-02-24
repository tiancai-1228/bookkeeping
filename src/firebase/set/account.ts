import { ref, set, update } from 'firebase/database';
import { userinfo } from '@/type/account';
import { db } from '../firebase';
import { createBookkeeping } from './bookkeeping';

export const updateUser = (userinfo: userinfo) => {
  update(ref(db, `users/${userinfo.id}`), {
    ...userinfo,
  });
};

export const setCurrentBookkeeping = (
  id: string,
  BookkeepingId: string,
  Bookkeeping: string,
) => {
  update(ref(db, `users/${id}`), {
    currentBookkeeping: { id: BookkeepingId, name: Bookkeeping },
  });
};

export const createUser = async (userinfo: userinfo) => {
  await set(ref(db, `users/${userinfo.id}`), {
    ...userinfo,
  });

  const initBookkeeping = await createBookkeeping(
    userinfo.id,
    'my-bookkeeping',
  );

  updateUser({
    ...userinfo,
    currentBookkeeping: { id: initBookkeeping!.id, name: 'my-bookkeeping' },
  });
};
