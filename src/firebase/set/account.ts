import { ref, set, update } from 'firebase/database';
import { userinfo } from '@/type/account';
import { db } from '../firebase';

export const updateUser = (userinfo: userinfo) => {
  update(ref(db, `users/${userinfo.id}`), {
    ...userinfo,
  });
};

export const createUser = (userinfo: userinfo) => {
  set(ref(db, `users/${userinfo.id}`), {
    ...userinfo,
  });
};
